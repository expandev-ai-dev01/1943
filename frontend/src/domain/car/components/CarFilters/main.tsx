import { useState, useEffect } from 'react';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Label } from '@/core/components/label';
import { Separator } from '@/core/components/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { Checkbox } from '@/core/components/checkbox';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/core/components/sheet';
import { FilterIcon } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import { useDebounce } from '@/core/hooks/useDebounce';
import type { CarFiltersProps } from './types';

function CarFiltersContent({ options, filters, onFilterChange, onClearFilters }: CarFiltersProps) {
  // Local state for price inputs to handle debounce
  const [priceMin, setPriceMin] = useState(filters.priceMin?.toString() || '');
  const [priceMax, setPriceMax] = useState(filters.priceMax?.toString() || '');

  const debouncedPriceMin = useDebounce(priceMin, 500);
  const debouncedPriceMax = useDebounce(priceMax, 500);

  // Sync local state with props when filters change externally (e.g. clear filters)
  useEffect(() => {
    setPriceMin(filters.priceMin?.toString() || '');
    setPriceMax(filters.priceMax?.toString() || '');
  }, [filters.priceMin, filters.priceMax]);

  // Apply debounced price changes
  useEffect(() => {
    if (debouncedPriceMin !== (filters.priceMin?.toString() || '')) {
      onFilterChange({ priceMin: debouncedPriceMin ? Number(debouncedPriceMin) : undefined });
    }
  }, [debouncedPriceMin]);

  useEffect(() => {
    if (debouncedPriceMax !== (filters.priceMax?.toString() || '')) {
      onFilterChange({ priceMax: debouncedPriceMax ? Number(debouncedPriceMax) : undefined });
    }
  }, [debouncedPriceMax]);

  const handleBrandChange = (brand: string) => {
    const currentBrands = filters.brand || [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];

    // Reset model when brand changes if needed, but requirement says filter models.
    // Since we don't have brand-model map, we just update brands.
    onFilterChange({ brand: newBrands.length > 0 ? newBrands : undefined });
  };

  const handleTransmissionChange = (trans: string) => {
    const currentTrans = filters.transmission || [];
    const newTrans = currentTrans.includes(trans)
      ? currentTrans.filter((t) => t !== trans)
      : [...currentTrans, trans];
    onFilterChange({ transmission: newTrans.length > 0 ? newTrans : undefined });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 px-2 text-xs">
          Limpar tudo
        </Button>
      </div>

      <Separator />

      {/* Brand Filter */}
      <div className="space-y-3">
        <Label>Marca</Label>
        <div className="space-y-2">
          {options.brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brand?.includes(brand)}
                onCheckedChange={() => handleBrandChange(brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="cursor-pointer font-normal">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Model Filter */}
      <div className="space-y-3">
        <Label>Modelo</Label>
        <Select
          value={filters.model?.[0] || 'all'}
          onValueChange={(value) =>
            onFilterChange({ model: value === 'all' ? undefined : [value] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o modelo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os modelos</SelectItem>
            {options.models.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label>Preço (R$)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Mín"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full"
            min={0}
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Máx"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full"
            min={0}
          />
        </div>
      </div>

      <Separator />

      {/* Year Range */}
      <div className="space-y-3">
        <Label>Ano</Label>
        <div className="flex items-center gap-2">
          <Select
            value={filters.yearMin?.toString() || 'all'}
            onValueChange={(value) =>
              onFilterChange({ yearMin: value === 'all' ? undefined : Number(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="De" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">De</SelectItem>
              {options.years.map((year) => (
                <SelectItem key={`min-${year}`} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground">-</span>
          <Select
            value={filters.yearMax?.toString() || 'all'}
            onValueChange={(value) =>
              onFilterChange({ yearMax: value === 'all' ? undefined : Number(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Até" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Até</SelectItem>
              {options.years.map((year) => (
                <SelectItem key={`max-${year}`} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Transmission */}
      <div className="space-y-3">
        <Label>Câmbio</Label>
        <div className="space-y-2">
          {options.transmissions.map((trans) => (
            <div key={trans} className="flex items-center space-x-2">
              <Checkbox
                id={`trans-${trans}`}
                checked={filters.transmission?.includes(trans)}
                onCheckedChange={() => handleTransmissionChange(trans)}
              />
              <Label htmlFor={`trans-${trans}`} className="cursor-pointer font-normal">
                {trans}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CarFilters(props: CarFiltersProps) {
  const { className } = props;

  return (
    <>
      {/* Desktop View */}
      <div className={cn('hidden w-64 shrink-0 lg:block', className)}>
        <CarFiltersContent {...props} />
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <FilterIcon className="size-4" />
              Filtrar Veículos
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-sm">
            <SheetHeader className="mb-6 text-left">
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <CarFiltersContent {...props} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export { CarFilters };
