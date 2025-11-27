/**
 * @summary
 * Validation schemas for Car entity operations.
 * Centralizes Zod validation logic for listing and filtering.
 *
 * @module services/car/carValidation
 */

import { z } from 'zod';
import { CAR_DEFAULTS, CAR_SORT_OPTIONS } from '@/constants/car';

/**
 * Helper to parse array from query string (comma separated or multiple params)
 */
const stringArraySchema = z
  .union([z.string().transform((val) => val.split(',').map((s) => s.trim())), z.array(z.string())])
  .optional();

/**
 * Schema for listing and filtering cars
 */
export const listSchema = z.object({
  brand: stringArraySchema,
  model: stringArraySchema,
  yearMin: z.coerce.number().int().positive().optional(),
  yearMax: z.coerce.number().int().positive().optional(),
  priceMin: z.coerce.number().nonnegative().optional(),
  priceMax: z.coerce.number().nonnegative().optional(),
  transmission: stringArraySchema,
  sortBy: z
    .enum([
      CAR_SORT_OPTIONS.RELEVANCE,
      CAR_SORT_OPTIONS.PRICE_ASC,
      CAR_SORT_OPTIONS.PRICE_DESC,
      CAR_SORT_OPTIONS.YEAR_DESC,
      CAR_SORT_OPTIONS.YEAR_ASC,
      CAR_SORT_OPTIONS.MODEL_ASC,
      CAR_SORT_OPTIONS.MODEL_DESC,
    ])
    .optional()
    .default(CAR_DEFAULTS.SORT_BY),
  page: z.coerce.number().int().positive().optional().default(CAR_DEFAULTS.PAGE_NUMBER),
  pageSize: z.coerce.number().int().positive().optional().default(CAR_DEFAULTS.PAGE_SIZE),
});

/**
 * Schema for ID parameter validation
 */
export const carParamsSchema = z.object({
  id: z.string().min(1),
});

export type ListInput = z.infer<typeof listSchema>;
export type CarParamsInput = z.infer<typeof carParamsSchema>;
