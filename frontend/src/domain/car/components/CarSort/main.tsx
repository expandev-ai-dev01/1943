import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { cn } from '@/core/lib/utils';
import type { CarSortProps } from './types';

function CarSort({ value, onSortChange, className }: CarSortProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-muted-foreground whitespace-nowrap text-sm">Ordenar por:</span>
      <Select value={value || 'relevance'} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Relevância" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevância</SelectItem>
          <SelectItem value="price_asc">Preço (menor para maior)</SelectItem>
          <SelectItem value="price_desc">Preço (maior para menor)</SelectItem>
          <SelectItem value="year_desc">Ano (mais recente)</SelectItem>
          <SelectItem value="year_asc">Ano (mais antigo)</SelectItem>
          <SelectItem value="model_asc">Modelo (A-Z)</SelectItem>
          <SelectItem value="model_desc">Modelo (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export { CarSort };
