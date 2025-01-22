interface StringifyOptions {
    depthLimit?: number;
    edgesLimit?: number;
}
type Replacer = (key: string, value: unknown) => unknown;
/**
 * Serializes an object or any type with deterministic key order, handling circular references, BigInt, and FormData.
 * @param obj The object or value to serialize.
 * @param replacer Optional replacer function.
 * @param spacer Optional spacer.
 * @param options Serialization options.
 * @returns The deterministic JSON string.
 */
declare function stringify(obj: unknown, replacer?: Replacer, spacer?: string | number, options?: StringifyOptions): string;

export { stringify };
