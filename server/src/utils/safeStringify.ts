const LIMIT_REPLACE_NODE = "[...]"; // Placeholder for nodes exceeding depth or edges limit
const CIRCULAR_REPLACE_NODE = "[Circular]"; // Placeholder for circular references

// Define the structure for options that control depth and edge limits
interface StringifyOptions {
  depthLimit?: number; // Maximum depth to serialize (prevents infinite recursion)
  edgesLimit?: number; // Maximum number of edges to traverse (prevents excessive size)
}

// Default options returned when none are provided
const defaultOptions = (): StringifyOptions => ({
  depthLimit: Number.MAX_SAFE_INTEGER, // No depth limit by default
  edgesLimit: Number.MAX_SAFE_INTEGER, // No edge limit by default
});

type ReplacerStack = [unknown, string | number, unknown][];
type TempChanges = [object, string | number, unknown, PropertyDescriptor?][];

type Replacer = (key: string, value: unknown) => unknown;

/**
 * Recursively processes an object or array, ensuring circular references and limits are handled.
 * @param val The value to process (either an object or primitive).
 * @param key The current key in the parent object (for reference).
 * @param edgeIndex The current index in the array or object being processed.
 * @param stack The map to track circular references (faster lookups).
 * @param parent The parent object, if available, to assign modified values.
 * @param depth The current depth in the object graph.
 * @param options The options containing depth and edge limits.
 * @param replacerStack The stack of values to be replaced.
 * @param tempChanges The temporary changes made during serialization.
 * @returns The modified object after deterministic traversal.
 */
function decirc(
  val: unknown,
  key: string | number,
  edgeIndex: number,
  stack: WeakMap<object, string[]>, // Track keys as well as objects for circular reference detection
  parent: object | undefined,
  depth: number,
  options: StringifyOptions,
  replacerStack: ReplacerStack,
  tempChanges: TempChanges,
): unknown {
  depth++; // Increment depth as we dive deeper into the object

  if (typeof val === "object" && val !== null) {
    // Circular reference detection
    if (stack.has(val as object)) {
      const keysInCycle = stack.get(val as object)!;
      setReplace(
        `${CIRCULAR_REPLACE_NODE}: ${keysInCycle.join(" -> ")}`,
        val,
        key,
        parent,
        replacerStack,
        tempChanges,
      );
      return;
    }

    // Depth limit check
    if (options.depthLimit && depth > options.depthLimit) {
      setReplace(
        LIMIT_REPLACE_NODE,
        val,
        key,
        parent,
        replacerStack,
        tempChanges,
      );
      return;
    }

    // Edge limit check
    if (options.edgesLimit && edgeIndex + 1 > options.edgesLimit) {
      setReplace(
        LIMIT_REPLACE_NODE,
        val,
        key,
        parent,
        replacerStack,
        tempChanges,
      );
      return;
    }

    // Add to stack to detect circular references, along with the key
    stack.set(val as object, [
      ...(stack.get(val as object) || []),
      String(key),
    ]);

    if (Array.isArray(val)) {
      // Handle array elements (including nested arrays)
      val.forEach((item, index) =>
        decirc(
          item,
          index,
          index,
          stack,
          val as object,
          depth,
          options,
          replacerStack,
          tempChanges,
        ),
      );
    } else {
      // Handle object properties (including nested objects)
      const keys = Object.keys(val);
      keys.sort().forEach((subKey, index) => {
        decirc(
          (val as Record<string, unknown>)[subKey],
          subKey,
          index,
          stack,
          val as object,
          depth,
          options,
          replacerStack,
          tempChanges,
        );
      });
    }

    stack.delete(val as object); // Cleanup
    return val; // Return processed object
  }

  return val; // Return primitive value directly if it's not an object
}

/**
 * Sets a placeholder value for circular references or objects exceeding limits.
 * @param replaceValue The value to replace with (e.g., circular or limit placeholders).
 * @param originalValue The original object before replacement.
 * @param key The key where replacement should happen.
 * @param parent The parent object to assign the modified value.
 * @param replacerStack The stack of replacements to track.
 * @param tempChanges The temporary changes made during serialization.
 */
function setReplace(
  replaceValue: unknown,
  originalValue: unknown,
  key: string | number,
  parent: object | undefined,
  replacerStack: ReplacerStack,
  tempChanges: TempChanges,
): void {
  if (!parent) return; // If no parent is provided, do nothing

  // Check for getter functions and handle accordingly
  const propertyDescriptor = Object.getOwnPropertyDescriptor(parent, key);
  if (propertyDescriptor?.get) {
    if (propertyDescriptor.configurable) {
      // Handle configuration of the getter
      Object.defineProperty(parent, key, { value: replaceValue });
      tempChanges.push([parent, key, originalValue, propertyDescriptor]);
    } else {
      replacerStack.push([originalValue, key, replaceValue]); // Only if it's non-configurable
    }
  } else {
    // Standard value assignment for non-getter properties
    (parent as Record<string, unknown>)[key] = replaceValue;
    tempChanges.push([parent, key, originalValue]);
  }
}

/**
 * Wraps the replacer function to handle BigInt conversion and other custom handling.
 * @param replacer The original replacer function passed to `JSON.stringify`.
 * @returns A new replacer function that converts BigInt to string.
 */
function wrapReplacer(replacer: Replacer | undefined): Replacer {
  return (key, value) => {
    if (typeof value === "function") {
      return value.name ? `[${value.name}()]` : `[anonymous()]`;
    }
    return replacer ? replacer(key, value) : value;
  };
}

/**
 * Handles getter replacements by looking up previously stored values in the replacer stack.
 * @param replacer The original replacer function.
 * @param replacerStack The stack of values to be replaced.
 * @returns A new replacer function that uses the replacer stack for replacement.
 */
function replaceGetterValues(
  replacer: Replacer,
  replacerStack: ReplacerStack,
): Replacer {
  const replaceMap = new Map(
    replacerStack.map(([obj, key, value]) => [`${obj}:${key}`, value]),
  );

  return (key, value) => {
    const replacement = replaceMap.get(`${value}:${key}`);
    if (replacement !== undefined) {
      value = replacement; // Use replacement if found
    }

    return replacer ? replacer(key, value) : value;
  };
}

/**
 * Serializes an object or any type with deterministic key order, handling circular references, BigInt, and FormData.
 * @param obj The object or value to serialize.
 * @param replacer Optional replacer function.
 * @param spacer Optional spacer.
 * @param options Serialization options.
 * @returns The deterministic JSON string.
 */
export function stringify(
  obj: unknown,
  replacer?: Replacer,
  spacer?: string | number,
  options: StringifyOptions = defaultOptions(),
): string {
  // Localized state for this invocation
  const replacerStack: ReplacerStack = [];
  const tempChanges: TempChanges = [];

  try {
    // Handle FormData objects
    if (obj instanceof FormData) {
      const formDataObj: Record<string, string> = {};
      // Iterate over FormData entries and add them to an object
      obj.forEach((value, key) => {
        formDataObj[key] = value instanceof File ? value.name : value;
      });
      // Serialize the FormData object as JSON
      return stringify(formDataObj, replacer, spacer, options);
    }

    // Check if the input is an object and handle accordingly
    const tmp =
      typeof obj === "object" && obj !== null
        ? decirc(
            obj,
            "",
            0,
            new WeakMap(),
            undefined,
            0,
            options,
            replacerStack,
            tempChanges,
          )
        : typeof obj === "function"
          ? obj.name
            ? `[${obj.name}()]`
            : "[anonymous()]"
          : String(obj);

    // Convert non-objects to their string representation
    if (typeof tmp === "string") return tmp;

    // Determine the replacer function to use
    const effectiveReplacer =
      replacerStack.length === 0
        ? wrapReplacer(replacer)
        : replaceGetterValues(wrapReplacer(replacer), replacerStack);

    return JSON.stringify(tmp, effectiveReplacer, spacer);
  } catch {
    return "[unable to serialize, circular reference is too complex to analyze]";
  }
}
