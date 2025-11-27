import { useSearchParams } from 'react-router-dom';
import { CarFilters, CarSort, CarCard } from '@/domain/car/components';
import { useCarList, useCarFilters } from '@/domain/car/hooks';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Empty, EmptyDescription, EmptyTitle, EmptyMedia } from '@/core/components/empty';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/core/components/pagination';
import { Button } from '@/core/components/button';
import { SearchXIcon } from 'lucide-react';
import type { CarFilters as CarFiltersType } from '@/domain/car/types';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse filters from URL
  const filters: CarFiltersType = {
    brand: searchParams.getAll('brand').length > 0 ? searchParams.getAll('brand') : undefined,
    model: searchParams.getAll('model').length > 0 ? searchParams.getAll('model') : undefined,
    yearMin: searchParams.get('yearMin') ? Number(searchParams.get('yearMin')) : undefined,
    yearMax: searchParams.get('yearMax') ? Number(searchParams.get('yearMax')) : undefined,
    priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
    priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    transmission:
      searchParams.getAll('transmission').length > 0
        ? searchParams.getAll('transmission')
        : undefined,
    sortBy: searchParams.get('sortBy') || 'relevance',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 12,
  };

  const {
    data: carsData,
    isLoading: isCarsLoading,
    error: carsError,
    refetch,
  } = useCarList(filters);
  const { data: filtersOptions, isLoading: isFiltersLoading } = useCarFilters();

  const updateFilters = (newFilters: Partial<CarFiltersType>) => {
    const newParams = new URLSearchParams(searchParams);

    // Helper to set or delete param
    const setOrDelete = (key: string, value: any) => {
      if (value === undefined || value === null || value === '') {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach((v) => newParams.append(key, v));
      } else {
        newParams.set(key, String(value));
      }
    };

    Object.entries(newFilters).forEach(([key, value]) => {
      setOrDelete(key, value);
    });

    // Reset page to 1 on filter change
    if (!newFilters.page) {
      newParams.set('page', '1');
    }

    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination items
  const renderPagination = () => {
    if (!carsData?.metadata || carsData.metadata.totalPages <= 1) return null;

    const { page, totalPages } = carsData.metadata;
    const items = [];

    // Previous
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => page > 1 && handlePageChange(page - 1)}
          className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        />
      </PaginationItem>
    );

    // Pages
    // Simple logic: show first, last, current, and neighbors
    const range = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - range && i <= page + range)) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={page === i}
              onClick={() => handlePageChange(i)}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if ((i === page - range - 1 && i > 1) || (i === page + range + 1 && i < totalPages)) {
        items.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Next
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => page < totalPages && handlePageChange(page + 1)}
          className={page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        />
      </PaginationItem>
    );

    return (
      <Pagination className="mt-8">
        <PaginationContent>{items}</PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="container space-y-8 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo de Veículos</h1>
          <p className="text-muted-foreground">
            Encontre o carro perfeito para você entre nossas opções.
          </p>
        </div>
        <CarSort
          value={filters.sortBy}
          onSortChange={(value) => updateFilters({ sortBy: value })}
        />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filters Sidebar */}
        <aside>
          {isFiltersLoading ? (
            <div className="w-64 space-y-4">
              <div className="bg-muted h-8 w-full animate-pulse rounded" />
              <div className="bg-muted h-64 w-full animate-pulse rounded" />
            </div>
          ) : filtersOptions ? (
            <CarFilters
              options={filtersOptions}
              filters={filters}
              onFilterChange={updateFilters}
              onClearFilters={clearFilters}
            />
          ) : null}
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {isCarsLoading ? (
            <div className="flex h-64 items-center justify-center">
              <LoadingSpinner className="size-8" />
            </div>
          ) : carsError ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <p className="text-destructive">Erro ao carregar veículos.</p>
              <Button onClick={() => refetch()}>Tentar novamente</Button>
            </div>
          ) : carsData?.data.length === 0 ? (
            <Empty>
              <EmptyMedia>
                <SearchXIcon className="size-10 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle>Nenhum veículo encontrado</EmptyTitle>
              <EmptyDescription>
                Não encontramos veículos com os filtros selecionados. Tente remover alguns filtros
                ou alterar os critérios de busca.
              </EmptyDescription>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Limpar Filtros
              </Button>
            </Empty>
          ) : (
            <>
              <div className="text-muted-foreground mb-4 text-sm">
                Exibindo {carsData?.data.length} de {carsData?.metadata.total} veículos
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {carsData?.data.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
              {renderPagination()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { HomePage };
