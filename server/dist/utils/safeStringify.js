const LIMIT_REPLACE_NODE = "[...]";
const CIRCULAR_REPLACE_NODE = "[Circular]";
const defaultOptions = () => ({
  depthLimit: Number.MAX_SAFE_INTEGER,
  // No depth limit by default
  edgesLimit: Number.MAX_SAFE_INTEGER
  // No edge limit by default
});
function decirc(val, key, edgeIndex, stack, parent, depth, options, replacerStack, tempChanges) {
  depth++;
  if (typeof val === "object" && val !== null) {
    if (stack.has(val)) {
      const keysInCycle = stack.get(val);
      setReplace(
        `${CIRCULAR_REPLACE_NODE}: ${keysInCycle.join(" -> ")}`,
        val,
        key,
        parent,
        replacerStack,
        tempChanges
      );
      return;
    }
    if (options.depthLimit && depth > options.depthLimit) {
      setReplace(
        LIMIT_REPLACE_NODE,
        val,
        key,
        parent,
        replacerStack,
        tempChanges
      );
      return;
    }
    if (options.edgesLimit && edgeIndex + 1 > options.edgesLimit) {
      setReplace(
        LIMIT_REPLACE_NODE,
        val,
        key,
        parent,
        replacerStack,
        tempChanges
      );
      return;
    }
    stack.set(val, [
      ...stack.get(val) || [],
      String(key)
    ]);
    if (Array.isArray(val)) {
      val.forEach(
        (item, index) => decirc(
          item,
          index,
          index,
          stack,
          val,
          depth,
          options,
          replacerStack,
          tempChanges
        )
      );
    } else {
      const keys = Object.keys(val);
      keys.sort().forEach((subKey, index) => {
        decirc(
          val[subKey],
          subKey,
          index,
          stack,
          val,
          depth,
          options,
          replacerStack,
          tempChanges
        );
      });
    }
    stack.delete(val);
    return val;
  }
  return val;
}
function setReplace(replaceValue, originalValue, key, parent, replacerStack, tempChanges) {
  if (!parent) return;
  const propertyDescriptor = Object.getOwnPropertyDescriptor(parent, key);
  if (propertyDescriptor?.get) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, key, { value: replaceValue });
      tempChanges.push([parent, key, originalValue, propertyDescriptor]);
    } else {
      replacerStack.push([originalValue, key, replaceValue]);
    }
  } else {
    parent[key] = replaceValue;
    tempChanges.push([parent, key, originalValue]);
  }
}
function wrapReplacer(replacer) {
  return (key, value) => {
    if (typeof value === "function") {
      return value.name ? `[${value.name}()]` : `[anonymous()]`;
    }
    return replacer ? replacer(key, value) : value;
  };
}
function replaceGetterValues(replacer, replacerStack) {
  const replaceMap = new Map(
    replacerStack.map(([obj, key, value]) => [`${obj}:${key}`, value])
  );
  return (key, value) => {
    const replacement = replaceMap.get(`${value}:${key}`);
    if (replacement !== void 0) {
      value = replacement;
    }
    return replacer ? replacer(key, value) : value;
  };
}
function stringify(obj, replacer, spacer, options = defaultOptions()) {
  const replacerStack = [];
  const tempChanges = [];
  try {
    if (obj instanceof FormData) {
      const formDataObj = {};
      obj.forEach((value, key) => {
        formDataObj[key] = value instanceof File ? value.name : value;
      });
      return stringify(formDataObj, replacer, spacer, options);
    }
    const tmp = typeof obj === "object" && obj !== null ? decirc(
      obj,
      "",
      0,
      /* @__PURE__ */ new WeakMap(),
      void 0,
      0,
      options,
      replacerStack,
      tempChanges
    ) : typeof obj === "function" ? obj.name ? `[${obj.name}()]` : "[anonymous()]" : String(obj);
    if (typeof tmp === "string") return tmp;
    const effectiveReplacer = replacerStack.length === 0 ? wrapReplacer(replacer) : replaceGetterValues(wrapReplacer(replacer), replacerStack);
    return JSON.stringify(tmp, effectiveReplacer, spacer);
  } catch {
    return "[unable to serialize, circular reference is too complex to analyze]";
  }
}
export {
  stringify
};
