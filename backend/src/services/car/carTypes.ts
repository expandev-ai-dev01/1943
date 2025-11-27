/**
 * @summary
 * Type definitions for Car entity and service operations.
 *
 * @module services/car/carTypes
 */

import { CarTransmission, CarFuelType, CarBodyType, CarStatus } from '@/constants/car';

/**
 * @interface CarItem
 * @description Represents a standard or optional item
 */
export interface CarItem {
  name: string;
  type: 'standard' | 'optional';
  category: 'Conforto' | 'Segurança' | 'Tecnologia' | 'Performance' | 'Estética';
}

/**
 * @interface CarHistory
 * @description Vehicle history information
 */
export interface CarHistory {
  provenance: string;
  ownerCount: number;
  warranty: string;
  revisions: { date: string; mileage: number; location: string }[];
  claims: { date: string; type: string; description: string }[];
}

/**
 * @interface CarSales
 * @description Sales conditions and documentation
 */
export interface CarSales {
  paymentMethods: string[];
  financingConditions?: {
    minDownPayment: number;
    interestRate: number;
    maxInstallments: number;
  };
  acceptsTrade: boolean;
  documentation: { name: string; observation: string }[];
  documentStatus: {
    status: string;
    pending: string[];
    observation: string;
  };
  observation?: string;
}

/**
 * @interface CarEntity
 * @description Represents a car entity in the system with full details
 */
export interface CarEntity {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  image: string;
  mileage: number;
  transmission: CarTransmission;
  highlighted: boolean;
  views: number;
  dateCreated: string;

  // Extended details
  modelYear: number;
  fuel: CarFuelType;
  power: string;
  color: string;
  doors: number;
  bodyType: CarBodyType;
  engine: string;
  plateEnd: number;
  status: CarStatus;

  // Media
  photos: string[];

  // Features
  items: CarItem[];

  // History
  history: CarHistory;

  // Sales
  sales: CarSales;
}

/**
 * @interface CarListResponse
 * @description Response structure for listing cars with pagination metadata
 */
export interface CarListResponse {
  data: CarEntity[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * @interface CarFiltersResponse
 * @description Response structure for available filters
 */
export interface CarFiltersResponse {
  brands: string[];
  models: string[];
  years: number[];
  priceRange: {
    min: number;
    max: number;
  };
  transmissions: string[];
}

/**
 * @interface CarFilterParams
 * @description Parameters for filtering and sorting cars
 */
export interface CarFilterParams {
  brand?: string[];
  model?: string[];
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  transmission?: string[];
  sortBy?: string;
  page?: number;
  pageSize?: number;
}
