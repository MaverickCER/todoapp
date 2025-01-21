import { TTask } from '@/zod';

/**
 * Parse the date fields in a task or an array of tasks.
 * Converts any date strings to Date objects.
 *
 * @param tasks - A single task or an array of tasks that need date parsing.
 * @returns A new object or array of tasks with date strings converted to Date objects.
 */
export const parseDates = (tasks: unknown) => {
  if (!tasks || typeof tasks !== 'object') return tasks;
  if (Array.isArray(tasks)) {
    return tasks.map((task: TTask) => {
      return Object.entries(task).reduce(
        (acc, [key, value]) => {
          const date = new Date(`${value}`);
          if (isNaN(date.getTime()) || key.toLowerCase().includes('id')) {
            acc[key] = value;
          } else {
            acc[key] = date;
          }
          return acc;
        },
        {} as Record<string, unknown>,
      );
    });
  }

  // If tasks is a single task object, iterate over its entries
  return Object.entries(tasks).reduce(
    (acc, [key, value]) => {
      const date = new Date(`${value}`);
      if (isNaN(date.getTime()) || key.toLowerCase().includes('id')) {
        acc[key] = value; // If it's not a valid date, leave the value as it is
      } else {
        acc[key] = date; // If it's a valid date, convert it to a Date object
      }
      return acc;
    },
    {} as Record<string, string | number | Date | null | undefined | boolean>,
  );
};

export default parseDates;
