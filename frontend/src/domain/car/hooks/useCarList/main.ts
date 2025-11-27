import { useQuery } from '@tanstack/react-query';
import { carService } from '../../services/carService';
import type { CarFilters } from '../../types';

export const useCarList = (filters: CarFilters) => {
  return useQuery({
    queryKey: ['cars', filters],
    queryFn: () => carService.list(filters),
    placeholderData: (previousData) => previousData,
  });
};
