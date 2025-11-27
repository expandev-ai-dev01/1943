import { useQuery } from '@tanstack/react-query';
import { carService } from '../../services/carService';

export const useCarDetails = (id: string) => {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => carService.getById(id),
    enabled: !!id,
  });
};
