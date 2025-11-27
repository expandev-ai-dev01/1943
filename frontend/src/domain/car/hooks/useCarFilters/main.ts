import { useQuery } from '@tanstack/react-query';
import { carService } from '../../services/carService';

export const useCarFilters = () => {
  return useQuery({
    queryKey: ['car-filters'],
    queryFn: () => carService.getFilters(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
