export interface Car {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  mileage?: number;
  transmission?: string;
}

export interface CarRevision {
  date: string;
  mileage: number;
  location: string;
}

export interface CarSinister {
  date: string;
  type: string;
  description: string;
}

export interface CarTechnicalReport {
  date: string;
  result: string;
}

export interface CarFinancingConditions {
  minDownPayment: number;
  interestRate: number;
  maxInstallments: number;
}

export interface CarDocument {
  name: string;
  observation?: string;
}

export interface CarDocumentStatus {
  status: 'regular' | 'pending' | 'in_progress';
  pendencies?: string[];
  observations?: string;
}

export interface CarDetail extends Car {
  status: 'available' | 'reserved' | 'sold';
  photos: string[];
  photoMain: string;
  photoCaptions?: Record<string, string>;

  // Specs
  modelYear: number;
  fuel: string;
  power: string;
  color: string;
  doors: number;
  bodyType: string;
  engine: string;
  plateEnd: number;

  // Items
  standardItems: Array<{ name: string; category: string }>;
  optionalItems: Array<{ name: string; category: string }>;

  // History
  provenance: string;
  ownersCount: number;
  warranty?: string;
  revisions?: CarRevision[];
  sinisters?: CarSinister[];
  technicalReport?: CarTechnicalReport;

  // Sales Conditions
  paymentMethods: string[];
  financingConditions?: CarFinancingConditions;
  acceptsTrade: boolean;
  salesObservations?: string;
  requiredDocuments: CarDocument[];
  documentStatus: CarDocumentStatus;

  // Sharing
  shareUrl: string;
  shareText: string;
}

export interface CarFilters {
  brand?: string[];
  model?: string[];
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  transmission?: string[];
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface CarFilterOptions {
  brands: string[];
  models: string[];
  years: number[];
  priceRange: {
    min: number;
    max: number;
  };
  transmissions: string[];
}

export interface CarListMetadata {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CarListResponse {
  data: Car[];
  metadata: CarListMetadata;
}
