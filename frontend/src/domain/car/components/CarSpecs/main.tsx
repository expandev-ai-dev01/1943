import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { formatNumber } from '@/core/utils/format';
import type { CarSpecsProps } from './types';

function CarSpecs({ car }: CarSpecsProps) {
  const specs = [
    { label: 'Marca', value: car.brand },
    { label: 'Modelo', value: car.model },
    { label: 'Ano Fabricação', value: car.year },
    { label: 'Ano Modelo', value: car.modelYear },
    { label: 'Quilometragem', value: `${formatNumber(car.mileage || 0)} km` },
    { label: 'Combustível', value: car.fuel },
    { label: 'Câmbio', value: car.transmission },
    { label: 'Potência', value: car.power },
    { label: 'Cor', value: car.color },
    { label: 'Portas', value: car.doors },
    { label: 'Carroceria', value: car.bodyType },
    { label: 'Motor', value: car.engine },
    { label: 'Final da Placa', value: car.plateEnd },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Especificações Técnicas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((spec, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-muted-foreground text-sm">{spec.label}</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { CarSpecs };
