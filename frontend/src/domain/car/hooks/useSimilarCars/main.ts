import { useQuery } from '@tanstack/react-query';
import { carService } from '../../services/carService';

export const useSimilarCars = (id: string) => {
  return useQuery({
    queryKey: ['car', id, 'similar'],
    queryFn: () => carService.getSimilar(id),
    enabled: !!id,
  });
};
