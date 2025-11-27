import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { CheckCircle2Icon, AlertTriangleIcon, HistoryIcon } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import type { CarHistoryProps } from './types';

function CarHistory({ car }: CarHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HistoryIcon className="size-5" />
          Histórico do Veículo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">Procedência</span>
            <span className="font-medium">{car.provenance}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">Proprietários Anteriores</span>
            <span className="font-medium">{car.ownersCount}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">Garantia</span>
            <span className="font-medium">{car.warranty || 'Sem garantia de fábrica'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Sinistros</h4>
          {car.sinisters && car.sinisters.length > 0 ? (
            <div className="border-destructive/20 bg-destructive/5 rounded-md border p-4">
              {car.sinisters.map((sinister, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <AlertTriangleIcon className="size-4 text-destructive mt-0.5" />
                  <div>
                    <p className="text-destructive font-medium">{sinister.type}</p>
                    <p className="text-muted-foreground text-sm">
                      {sinister.description} ({sinister.date})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400">
              <CheckCircle2Icon className="size-5" />
              <span className="font-medium">Sem registro de sinistros</span>
            </div>
          )}
        </div>

        {car.revisions && car.revisions.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold">Revisões</h4>
            <div className="rounded-md border">
              {car.revisions.map((revision, idx) => (
                <div
                  key={idx}
                  className={cn('flex justify-between p-3 text-sm', idx !== 0 && 'border-t')}
                >
                  <span>{revision.date}</span>
                  <span className="text-muted-foreground">{revision.location}</span>
                  <span className="font-medium">{revision.mileage} km</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { CarHistory };
