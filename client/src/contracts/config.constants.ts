import { z } from 'zod';

// Define the schema for your configuration using Zod
const ConfigSchema = z.object({
  IS_CLIENT: z.string().min(0, 'IS_CLIENT should be an empty string'),
  AUTH_ISSUER: z.string().min(1, 'AUTH_ISSUER is required'),
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL'),
  NEXT_PUBLIC_URL: z.string().url('NEXT_PUBLIC_URL must be a valid URL'),
  NEXT_PUBLIC_A11Y: z.string(),
  NODE_ENV: z.string().min(1, 'NODE_ENV is required'),
  EMAIL_HOST: z.string().min(1, 'EMAIL_HOST is required'),
  EMAIL_PORT: z.string().min(1, 'EMAIL_PORT is required'),
  EMAIL_USER: z.string().optional().transform((val) => val || ''),
  EMAIL_PASS: z.string().optional().transform((val) => val || ''),
  EMAIL_TO: z.string().email('EMAIL_TO must be a valid email address'),
  CORE_URL: z.string().url('CORE_URL must match your express server url'),
});

// Parse environment variables with Zod
const configSchema = ConfigSchema.safeParse(process.env);
const emptyConfig = {
  IS_CLIENT: true,
  AUTH_ISSUER: '',
  // DATABASE_URL: '',
  NEXTAUTH_SECRET: '',
  NEXTAUTH_URL: '',
  NEXT_PUBLIC_URL: '',
  NEXT_PUBLIC_A11Y: '',
  NODE_ENV: process.env.NODE_ENV,
  EMAIL_HOST: '',
  EMAIL_PORT: '',
  EMAIL_USER: '',
  EMAIL_PASS: '',
  EMAIL_TO: '',
  CORE_URL: '',
};
if (!configSchema.success && typeof window === 'undefined') throw new Error(configSchema.error.message);
export const config = !configSchema.success ? emptyConfig : configSchema.data;
