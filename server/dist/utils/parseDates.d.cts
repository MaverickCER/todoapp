/**
 * Parse the date fields in a task or an array of tasks.
 * Converts any date strings to Date objects.
 *
 * @param tasks - A single task or an array of tasks that need date parsing.
 * @returns A new object or array of tasks with date strings converted to Date objects.
 */
declare const parseDates: (tasks: unknown) => unknown;

export { parseDates as default, parseDates };
