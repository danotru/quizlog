import { z } from "zod";

/**
 * Validation schema for required field
 * @param fieldName the field name
 */
export const requiredSchema = (fieldName: string) =>
  z.string().min(1, `${fieldName} is required`);
