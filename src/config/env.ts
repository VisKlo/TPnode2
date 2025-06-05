import dotenv from "dotenv";
import { EnvConfig } from "../types/env";

dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Variable d'environnement non trouvé: ${key}`);
  }
  return value;
}

export const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "3000"),
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
    ORIGIN: process.env.ORIGIN || "http://localhost:5173",
    DATABASE_URL: requireEnv("DATABASE_URL"),
    JWT_SECRET: requireEnv("JWT_SECRET")
    
}