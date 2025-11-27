import type { CarFilterOptions, CarFilters } from '../../types';

export interface CarFiltersProps {
  options: CarFilterOptions;
  filters: CarFilters;
  onFilterChange: (newFilters: Partial<CarFilters>) => void;
  onClearFilters: () => void;
  className?: string;
  isLoading?: boolean;
}
