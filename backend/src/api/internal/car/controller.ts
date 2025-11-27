/**
 * @summary
 * API controller for Car entity.
 * Handles listing, filtering, and retrieval of vehicles.
 *
 * @module api/internal/car/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { carList, carGetFilters, carGet, carGetSimilar } from '@/services/car';

/**
 * @api {get} /api/internal/car List Cars
 * @apiName ListCars
 * @apiGroup Car
 *
 * @apiParam {String[]} [brand] Filter by brand
 * @apiParam {String[]} [model] Filter by model
 * @apiParam {Number} [yearMin] Minimum year
 * @apiParam {Number} [yearMax] Maximum year
 * @apiParam {Number} [priceMin] Minimum price
 * @apiParam {Number} [priceMax] Maximum price
 * @apiParam {String[]} [transmission] Filter by transmission
 * @apiParam {String} [sortBy] Sort criteria
 * @apiParam {Number} [page] Page number
 * @apiParam {Number} [pageSize] Items per page
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object[]} data List of cars
 * @apiSuccess {Object} metadata Pagination metadata
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await carList(req.query);
    res.json(successResponse(result.data, result.metadata));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/car/filters Get Car Filters
 * @apiName GetCarFilters
 * @apiGroup Car
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Available filters
 * @apiSuccess {String[]} data.brands Available brands
 * @apiSuccess {String[]} data.models Available models
 * @apiSuccess {Number[]} data.years Available years
 * @apiSuccess {Object} data.priceRange Min and max prices
 * @apiSuccess {String[]} data.transmissions Available transmissions
 */
export async function filtersHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await carGetFilters();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/car/:id Get Car Details
 * @apiName GetCar
 * @apiGroup Car
 *
 * @apiParam {String} id Car ID
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Car details
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await carGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/car/:id/similar Get Similar Cars
 * @apiName GetSimilarCars
 * @apiGroup Car
 *
 * @apiParam {String} id Car ID
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object[]} data List of similar cars
 */
export async function getSimilarHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await carGetSimilar(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
