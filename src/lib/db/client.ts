import * as schema from "./schemas";
import { drizzle } from "drizzle-orm/postgres-js";

/**
 * Database client
 */
export const db = drizzle(process.env.DATABASE_URL!, { schema });
