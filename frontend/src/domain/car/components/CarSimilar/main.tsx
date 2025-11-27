import { CarCard } from '../CarCard';
import type { CarSimilarProps } from './types';

function CarSimilar({ cars }: CarSimilarProps) {
  if (!cars || cars.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Veículos Similares</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}

export { CarSimilar };
