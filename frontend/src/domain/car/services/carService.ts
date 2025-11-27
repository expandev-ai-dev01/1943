import { authenticatedClient } from '@/core/lib/api';
import type { CarListResponse, CarFilterOptions, CarFilters, CarDetail, Car } from '../types';
import type { ContactFormOutput } from '../types/forms';

/**
 * @service CarService
 * @domain Car
 */
export const carService = {
  /**
   * List cars with filters and pagination
   */
  async list(params?: CarFilters): Promise<CarListResponse> {
    const { data } = await authenticatedClient.get('/car', { params });
    return data;
  },

  /**
   * Get available filters for cars
   */
  async getFilters(): Promise<CarFilterOptions> {
    const { data } = await authenticatedClient.get('/car/filters');
    return data.data;
  },

  /**
   * Get car details by ID
   */
  async getById(id: string): Promise<CarDetail> {
    const { data } = await authenticatedClient.get(`/car/${id}`);
    return data.data;
  },

  /**
   * Get similar cars
   */
  async getSimilar(id: string): Promise<Car[]> {
    const { data } = await authenticatedClient.get(`/car/${id}/similar`);
    return data.data;
  },

  /**
   * Send contact interest
   */
  async sendContact(data: ContactFormOutput): Promise<void> {
    await authenticatedClient.post('/contact', data);
  },
};
