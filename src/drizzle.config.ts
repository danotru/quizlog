import "dotenv/config";
import { defineConfig } from "drizzle-kit";

/**
 * Drizzle ORM config
 */
export default defineConfig({
  out: "./drizzle",
  schemaFilter: ["public"],
  schema: "./lib/db/schemas.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
