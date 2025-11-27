import { Card, CardContent, CardFooter, CardHeader } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { Button } from '@/core/components/button';
import { cn } from '@/core/lib/utils';
import { formatCurrency, formatNumber } from '@/core/utils/format';
import { CalendarIcon, GaugeIcon, Settings2Icon } from 'lucide-react';
import { useNavigation } from '@/core/hooks/useNavigation';
import type { CarCardProps } from './types';

function CarCard({ car, className }: CarCardProps) {
  const { navigate } = useNavigation();

  const handleNavigate = () => {
    navigate(`/car/${car.id}`);
  };

  return (
    <Card
      className={cn(
        'group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md',
        className
      )}
      onClick={handleNavigate}
    >
      <div className="bg-muted aspect-video w-full overflow-hidden">
        <img
          src={car.imageUrl || '/placeholder-car.png'}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Badge variant="secondary" className="mb-2">
              {car.brand}
            </Badge>
            <h3 className="line-clamp-1 text-lg font-semibold tracking-tight">{car.model}</h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="text-primary mb-4 text-xl font-bold">{formatCurrency(car.price)}</div>

        <div className="text-muted-foreground grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="size-4" />
            <span>{car.year}</span>
          </div>
          {car.mileage !== undefined && (
            <div className="flex items-center gap-1.5">
              <GaugeIcon className="size-4" />
              <span>{formatNumber(car.mileage)} km</span>
            </div>
          )}
          {car.transmission && (
            <div className="col-span-2 flex items-center gap-1.5">
              <Settings2Icon className="size-4" />
              <span>{car.transmission}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-4 pt-0">
        <Button className="w-full" variant="outline">
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}

export { CarCard };
