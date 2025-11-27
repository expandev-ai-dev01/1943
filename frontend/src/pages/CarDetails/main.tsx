import { useParams } from 'react-router-dom';
import { useCarDetails, useSimilarCars } from '@/domain/car/hooks';
import {
  CarGallery,
  CarSpecs,
  CarItems,
  CarHistory,
  CarContactForm,
  CarSimilar,
} from '@/domain/car/components';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Button } from '@/core/components/button';
import { Badge } from '@/core/components/badge';
import { Separator } from '@/core/components/separator';
import { formatCurrency } from '@/core/utils/format';
import { useNavigation } from '@/core/hooks/useNavigation';
import { ArrowLeftIcon, Share2Icon } from 'lucide-react';
import { toast } from 'sonner';

function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { goBack } = useNavigation();
  const { data: car, isLoading, error } = useCarDetails(id!);
  const { data: similarCars } = useSimilarCars(id!);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Veículo não encontrado</h1>
        <Button onClick={goBack}>Voltar</Button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${car.brand} ${car.model}`,
          text: car.shareText,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="container space-y-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={goBack} className="gap-2">
          <ArrowLeftIcon className="size-4" />
          Voltar
        </Button>
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2Icon className="size-4" />
          Compartilhar
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column (Gallery & Details) */}
        <div className="space-y-8 lg:col-span-2">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {car.brand} {car.model}
              </h1>
              <Badge variant={car.status === 'available' ? 'default' : 'secondary'}>
                {car.status === 'available'
                  ? 'Disponível'
                  : car.status === 'reserved'
                  ? 'Reservado'
                  : 'Vendido'}
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">
              {car.modelYear} • {car.mileage} km
            </p>
          </div>

          <CarGallery
            photos={car.photos}
            mainPhoto={car.photoMain}
            altText={`${car.brand} ${car.model}`}
          />

          <CarSpecs car={car} />
          <CarItems car={car} />
          <CarHistory car={car} />
        </div>

        {/* Right Column (Price & Contact) */}
        <div className="space-y-8">
          <div className="sticky top-8 space-y-8">
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <p className="text-muted-foreground text-sm font-medium">Preço à vista</p>
              <div className="text-primary text-4xl font-bold">{formatCurrency(car.price)}</div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Entrada mínima:</span>{' '}
                  {formatCurrency(car.financingConditions?.minDownPayment || 0)}
                </p>
                <p>
                  <span className="font-medium">Parcelas:</span> até{' '}
                  {car.financingConditions?.maxInstallments}x
                </p>
                <p>
                  <span className="font-medium">Aceita troca:</span>{' '}
                  {car.acceptsTrade ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>

            <CarContactForm carId={car.id} carName={`${car.brand} ${car.model}`} />
          </div>
        </div>
      </div>

      <Separator />

      {/* Similar Cars */}
      {similarCars && similarCars.length > 0 && <CarSimilar cars={similarCars} />}
    </div>
  );
}

export { CarDetailsPage };
