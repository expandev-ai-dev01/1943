/**
 * @summary
 * Default values and constants for Car entity.
 * Defines pagination defaults, sorting options, and transmission types.
 *
 * @module constants/car/carDefaults
 */

/**
 * @interface CarDefaultsType
 * @description Default configuration values for car listing and pagination.
 */
export const CAR_DEFAULTS = {
  PAGE_SIZE: 12,
  PAGE_NUMBER: 1,
  SORT_BY: 'relevance',
} as const;

/**
 * @interface CarTransmissionsType
 * @description Available transmission types for vehicles.
 */
export const CAR_TRANSMISSIONS = {
  MANUAL: 'Manual',
  AUTOMATIC: 'Automático',
  CVT: 'CVT',
  SEMI_AUTOMATIC: 'Semi-automático',
  AUTOMATED: 'Automatizado',
} as const;

/**
 * @interface CarFuelTypesType
 * @description Available fuel types.
 */
export const CAR_FUEL_TYPES = {
  GASOLINE: 'Gasolina',
  ETHANOL: 'Etanol',
  FLEX: 'Flex',
  DIESEL: 'Diesel',
  ELECTRIC: 'Elétrico',
  HYBRID: 'Híbrido',
} as const;

/**
 * @interface CarBodyTypesType
 * @description Available body types.
 */
export const CAR_BODY_TYPES = {
  HATCH: 'Hatch',
  SEDAN: 'Sedan',
  SUV: 'SUV',
  PICKUP: 'Picape',
  MINIVAN: 'Minivan',
  CONVERTIBLE: 'Conversível',
  COUPE: 'Cupê',
  WAGON: 'Wagon',
} as const;

/**
 * @interface CarStatusType
 * @description Vehicle availability status.
 */
export const CAR_STATUS = {
  AVAILABLE: 'Disponível',
  RESERVED: 'Reservado',
  SOLD: 'Vendido',
} as const;

/**
 * @interface CarSortOptionsType
 * @description Available sorting criteria for car listing.
 */
export const CAR_SORT_OPTIONS = {
  RELEVANCE: 'relevance',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  YEAR_DESC: 'year_desc',
  YEAR_ASC: 'year_asc',
  MODEL_ASC: 'model_asc',
  MODEL_DESC: 'model_desc',
} as const;

export type CarTransmission = (typeof CAR_TRANSMISSIONS)[keyof typeof CAR_TRANSMISSIONS];
export type CarFuelType = (typeof CAR_FUEL_TYPES)[keyof typeof CAR_FUEL_TYPES];
export type CarBodyType = (typeof CAR_BODY_TYPES)[keyof typeof CAR_BODY_TYPES];
export type CarStatus = (typeof CAR_STATUS)[keyof typeof CAR_STATUS];
export type CarSortOption = (typeof CAR_SORT_OPTIONS)[keyof typeof CAR_SORT_OPTIONS];
