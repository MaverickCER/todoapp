import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
// Define the schema for your configuration using Zod
const ConfigSchema = z.object({
  NODE_ENV: z.string().min(1, "NODE_ENV is required"),
  ALLOWED_LIST: z.string().min(1, "ALLOWED_LIST is required"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NUM_WORKERS: z.string().transform((val) => parseInt(`${val}`, 10)),
  SECRET_KEY: z.string().min(1, "SECRET_KEY is required"),
  PORT_CORE: z.string().min(1, "PORT_CORE is required"),
  EMAIL_HOST: z.string().min(1, "EMAIL_HOST is required"),
  EMAIL_PORT: z.string().min(1, "EMAIL_PORT is required"),
  EMAIL_USER: z
    .string()
    .optional()
    .transform((val) => val || ""),
  EMAIL_PASS: z
    .string()
    .optional()
    .transform((val) => val || ""),
  EMAIL_TO: z.string().email("EMAIL_TO must be a valid email address"),
});

// Parse environment variables with Zod
const configSchema = ConfigSchema.safeParse(process.env);
const emptyConfig = {
  ALLOWED_LIST: "*",
  NODE_ENV: "production",
  DATABASE_URL: "DATABASE_URL_MISSING",
  NUM_WORKERS: 1,
  SECRET_KEY: "secret",
  PORT_CORE: "5000",
  EMAIL_HOST: "",
  EMAIL_PORT: "",
  EMAIL_USER: "",
  EMAIL_PASS: "",
  EMAIL_TO: "",
};
if (!configSchema.success && typeof window === "undefined")
  throw new Error(configSchema.error.message);
export const config = !configSchema.success ? emptyConfig : configSchema.data;
