/**
 * @summary
 * Business logic for Car entity.
 * Handles listing, filtering, sorting, and retrieval of cars.
 *
 * @module services/car/carService
 */

import { carStore } from '@/instances';
import { ServiceError } from '@/utils';
import { CAR_SORT_OPTIONS } from '@/constants/car';
import { CarEntity, CarListResponse, CarFiltersResponse } from './carTypes';
import { listSchema, carParamsSchema } from './carValidation';

/**
 * @summary
 * Lists cars with filtering, sorting, and pagination.
 *
 * @function carList
 * @module services/car
 *
 * @param {unknown} params - Query parameters for filtering and pagination
 * @returns {Promise<CarListResponse>} Paginated list of cars
 */
export async function carList(params: unknown): Promise<CarListResponse> {
  const validation = listSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid parameters', 400, validation.error.errors);
  }

  const filters = validation.data;
  let cars = carStore.getAll();

  // Apply Filters
  if (filters.brand && filters.brand.length > 0) {
    cars = cars.filter((car) => filters.brand?.includes(car.brand));
  }

  if (filters.model && filters.model.length > 0) {
    cars = cars.filter((car) => filters.model?.includes(car.model));
  }

  if (filters.yearMin) {
    cars = cars.filter((car) => car.year >= filters.yearMin!);
  }

  if (filters.yearMax) {
    cars = cars.filter((car) => car.year <= filters.yearMax!);
  }

  if (filters.priceMin) {
    cars = cars.filter((car) => car.price >= filters.priceMin!);
  }

  if (filters.priceMax) {
    cars = cars.filter((car) => car.price <= filters.priceMax!);
  }

  if (filters.transmission && filters.transmission.length > 0) {
    cars = cars.filter(
      (car) => car.transmission && filters.transmission?.includes(car.transmission)
    );
  }

  // Apply Sorting
  cars.sort((a, b) => {
    switch (filters.sortBy) {
      case CAR_SORT_OPTIONS.PRICE_ASC:
        return a.price - b.price;
      case CAR_SORT_OPTIONS.PRICE_DESC:
        return b.price - a.price;
      case CAR_SORT_OPTIONS.YEAR_ASC:
        return a.year - b.year;
      case CAR_SORT_OPTIONS.YEAR_DESC:
        return b.year - a.year;
      case CAR_SORT_OPTIONS.MODEL_ASC:
        return a.model.localeCompare(b.model);
      case CAR_SORT_OPTIONS.MODEL_DESC:
        return b.model.localeCompare(a.model);
      case CAR_SORT_OPTIONS.RELEVANCE:
      default:
        // Relevance: Highlighted first, then by views (desc), then by date (desc)
        if (a.highlighted !== b.highlighted) return a.highlighted ? -1 : 1;
        if (a.views !== b.views) return b.views - a.views;
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    }
  });

  // Apply Pagination
  const total = cars.length;
  const page = filters.page;
  const pageSize = filters.pageSize;
  const totalPages = Math.ceil(total / pageSize);
  const offset = (page - 1) * pageSize;
  const paginatedCars = cars.slice(offset, offset + pageSize);

  return {
    data: paginatedCars,
    metadata: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
}

/**
 * @summary
 * Retrieves available filters based on current catalog data.
 *
 * @function carGetFilters
 * @module services/car
 *
 * @returns {Promise<CarFiltersResponse>} Available filter options
 */
export async function carGetFilters(): Promise<CarFiltersResponse> {
  const cars = carStore.getAll();

  const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();
  const models = Array.from(new Set(cars.map((c) => c.model))).sort();
  const years = Array.from(new Set(cars.map((c) => c.year))).sort((a, b) => b - a);
  const transmissions = Array.from(
    new Set(cars.map((c) => c.transmission).filter(Boolean) as string[])
  ).sort();

  const prices = cars.map((c) => c.price);
  const priceRange = {
    min: prices.length ? Math.min(...prices) : 0,
    max: prices.length ? Math.max(...prices) : 0,
  };

  return {
    brands,
    models,
    years,
    priceRange,
    transmissions,
  };
}

/**
 * @summary
 * Retrieves a specific car by its ID.
 *
 * @function carGet
 * @module services/car
 *
 * @param {unknown} params - Request parameters containing ID
 * @returns {Promise<CarEntity>} Car details
 */
export async function carGet(params: unknown): Promise<CarEntity> {
  const validation = carParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const car = carStore.getById(id);

  if (!car) {
    throw new ServiceError('NOT_FOUND', 'Car not found', 404);
  }

  return car;
}

/**
 * @summary
 * Retrieves similar cars based on the current car's characteristics.
 * Criteria: Same body type or brand, excluding current car.
 *
 * @function carGetSimilar
 * @module services/car
 *
 * @param {unknown} params - Request parameters containing ID
 * @returns {Promise<CarEntity[]>} List of similar cars (max 6)
 */
export async function carGetSimilar(params: unknown): Promise<CarEntity[]> {
  const validation = carParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const currentCar = carStore.getById(id);

  if (!currentCar) {
    throw new ServiceError('NOT_FOUND', 'Car not found', 404);
  }

  const allCars = carStore.getAll();

  // Filter similar cars: Same body type OR same brand, excluding self
  const similarCars = allCars.filter(
    (car) =>
      car.id !== id && (car.bodyType === currentCar.bodyType || car.brand === currentCar.brand)
  );

  // Sort by price proximity (simple heuristic)
  similarCars.sort(
    (a, b) => Math.abs(a.price - currentCar.price) - Math.abs(b.price - currentCar.price)
  );

  // Return top 6
  return similarCars.slice(0, 6);
}
