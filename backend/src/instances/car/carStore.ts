/**
 * @summary
 * In-memory store instance for Car entity.
 * Provides singleton pattern for data storage with seeding capability.
 *
 * @module instances/car/carStore
 */

import {
  CAR_TRANSMISSIONS,
  CAR_FUEL_TYPES,
  CAR_BODY_TYPES,
  CAR_STATUS,
  CarTransmission,
  CarFuelType,
  CarBodyType,
  CarStatus,
} from '@/constants/car';
import { CarItem, CarHistory, CarSales } from '@/services/car/carTypes';

/**
 * Car record structure matching the feature specification
 */
export interface CarRecord {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  image: string;
  mileage: number;
  transmission: CarTransmission;
  highlighted: boolean;
  views: number;
  dateCreated: string;

  // Extended details
  modelYear: number;
  fuel: CarFuelType;
  power: string;
  color: string;
  doors: number;
  bodyType: CarBodyType;
  engine: string;
  plateEnd: number;
  status: CarStatus;

  // Media
  photos: string[];

  // Features
  items: CarItem[];

  // History
  history: CarHistory;

  // Sales
  sales: CarSales;
}

/**
 * In-memory store for Car records
 */
class CarStore {
  private records: Map<string, CarRecord> = new Map();

  constructor() {
    this.seed();
  }

  /**
   * Get all records
   */
  getAll(): CarRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: string): CarRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: CarRecord): CarRecord {
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Seed initial data for demonstration
   */
  private seed(): void {
    const now = new Date().toISOString();

    // Helper to generate extended details
    const enrichCar = (base: any): CarRecord => {
      const isNew = base.mileage < 100;
      const bodyType = this.guessBodyType(base.model);

      return {
        ...base,
        modelYear: base.year,
        fuel: CAR_FUEL_TYPES.FLEX,
        power: '150 cv',
        color: 'Preto',
        doors: 4,
        bodyType,
        engine: '2.0',
        plateEnd: Math.floor(Math.random() * 10),
        status: CAR_STATUS.AVAILABLE,
        photos: [
          base.image,
          'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=600&q=80',
        ],
        items: [
          { name: 'Ar condicionado digital', type: 'standard', category: 'Conforto' },
          { name: 'Direção elétrica', type: 'standard', category: 'Conforto' },
          { name: 'Vidros elétricos', type: 'standard', category: 'Conforto' },
          { name: 'Airbags frontais e laterais', type: 'standard', category: 'Segurança' },
          { name: 'Freios ABS', type: 'standard', category: 'Segurança' },
          { name: 'Controle de estabilidade', type: 'standard', category: 'Segurança' },
          { name: 'Central multimídia', type: 'standard', category: 'Tecnologia' },
          { name: 'Câmera de ré', type: 'standard', category: 'Tecnologia' },
          { name: 'Bancos em couro', type: 'optional', category: 'Estética' },
          { name: 'Teto solar', type: 'optional', category: 'Estética' },
        ],
        history: {
          provenance: isNew ? 'Concessionária' : 'Particular',
          ownerCount: isNew ? 0 : 1,
          warranty: isNew ? '3 anos' : 'Sem garantia',
          revisions: isNew
            ? []
            : [{ date: '2023-01-15', mileage: 10000, location: 'Concessionária Oficial' }],
          claims: [],
        },
        sales: {
          paymentMethods: ['À vista', 'Financiamento', 'Consórcio'],
          financingConditions: {
            minDownPayment: base.price * 0.2,
            interestRate: 1.49,
            maxInstallments: 60,
          },
          acceptsTrade: true,
          documentation: [
            { name: 'CRV', observation: 'Certificado de Registro de Veículo' },
            { name: 'Manual e Chave Reserva', observation: 'Disponível' },
          ],
          documentStatus: {
            status: 'Regular',
            pending: [],
            observation: 'IPVA 2024 Pago',
          },
        },
      };
    };

    const baseCars = [
      {
        id: 'car-001',
        brand: 'Toyota',
        model: 'Corolla XEi',
        year: 2023,
        price: 145000,
        image:
          'https://images.unsplash.com/photo-1623869675781-80e6c6782c47?auto=format&fit=crop&w=600&q=80',
        mileage: 15000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: true,
        views: 150,
        dateCreated: now,
      },
      {
        id: 'car-002',
        brand: 'Honda',
        model: 'Civic Touring',
        year: 2022,
        price: 160000,
        image:
          'https://images.unsplash.com/photo-1606618754116-0c03481368d8?auto=format&fit=crop&w=600&q=80',
        mileage: 22000,
        transmission: CAR_TRANSMISSIONS.CVT,
        highlighted: true,
        views: 120,
        dateCreated: now,
      },
      {
        id: 'car-003',
        brand: 'Ford',
        model: 'Mustang GT',
        year: 2021,
        price: 450000,
        image:
          'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=600&q=80',
        mileage: 5000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: true,
        views: 300,
        dateCreated: now,
      },
      {
        id: 'car-004',
        brand: 'Chevrolet',
        model: 'Onix Plus',
        year: 2024,
        price: 95000,
        image:
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
        mileage: 0,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: false,
        views: 80,
        dateCreated: now,
      },
      {
        id: 'car-005',
        brand: 'BMW',
        model: 'X5 xDrive45e',
        year: 2023,
        price: 680000,
        image:
          'https://images.unsplash.com/photo-1556189250-72ba95452250?auto=format&fit=crop&w=600&q=80',
        mileage: 8000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: true,
        views: 200,
        dateCreated: now,
      },
      {
        id: 'car-006',
        brand: 'Fiat',
        model: 'Pulse Audace',
        year: 2023,
        price: 115000,
        image:
          'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=600&q=80',
        mileage: 12000,
        transmission: CAR_TRANSMISSIONS.CVT,
        highlighted: false,
        views: 95,
        dateCreated: now,
      },
      {
        id: 'car-007',
        brand: 'Jeep',
        model: 'Compass Longitude',
        year: 2022,
        price: 175000,
        image:
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
        mileage: 28000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: false,
        views: 110,
        dateCreated: now,
      },
      {
        id: 'car-008',
        brand: 'Volkswagen',
        model: 'T-Cross Highline',
        year: 2023,
        price: 155000,
        image:
          'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
        mileage: 18000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: false,
        views: 105,
        dateCreated: now,
      },
      {
        id: 'car-009',
        brand: 'Hyundai',
        model: 'Creta Ultimate',
        year: 2024,
        price: 165000,
        image:
          'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
        mileage: 5000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: false,
        views: 90,
        dateCreated: now,
      },
      {
        id: 'car-010',
        brand: 'Nissan',
        model: 'Kicks Exclusive',
        year: 2022,
        price: 135000,
        image:
          'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
        mileage: 35000,
        transmission: CAR_TRANSMISSIONS.CVT,
        highlighted: false,
        views: 75,
        dateCreated: now,
      },
      {
        id: 'car-011',
        brand: 'Toyota',
        model: 'Hilux SRX',
        year: 2023,
        price: 320000,
        image:
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
        mileage: 25000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: true,
        views: 180,
        dateCreated: now,
      },
      {
        id: 'car-012',
        brand: 'Ford',
        model: 'Ranger Limited',
        year: 2024,
        price: 340000,
        image:
          'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=600&q=80',
        mileage: 2000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: true,
        views: 160,
        dateCreated: now,
      },
      {
        id: 'car-013',
        brand: 'Chevrolet',
        model: 'Tracker Premier',
        year: 2023,
        price: 140000,
        image:
          'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=600&q=80',
        mileage: 15000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: false,
        views: 85,
        dateCreated: now,
      },
      {
        id: 'car-014',
        brand: 'Volkswagen',
        model: 'Nivus Highline',
        year: 2022,
        price: 130000,
        image:
          'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
        mileage: 30000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: false,
        views: 95,
        dateCreated: now,
      },
      {
        id: 'car-015',
        brand: 'Fiat',
        model: 'Toro Ultra',
        year: 2023,
        price: 210000,
        image:
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
        mileage: 18000,
        transmission: CAR_TRANSMISSIONS.AUTOMATIC,
        highlighted: false,
        views: 100,
        dateCreated: now,
      },
    ];

    baseCars.forEach((car) => this.add(enrichCar(car)));
  }

  private guessBodyType(model: string): CarBodyType {
    if (model.includes('Hilux') || model.includes('Ranger') || model.includes('Toro'))
      return CAR_BODY_TYPES.PICKUP;
    if (
      model.includes('X5') ||
      model.includes('Pulse') ||
      model.includes('Compass') ||
      model.includes('T-Cross') ||
      model.includes('Creta') ||
      model.includes('Kicks') ||
      model.includes('Tracker') ||
      model.includes('Nivus')
    )
      return CAR_BODY_TYPES.SUV;
    if (model.includes('Mustang')) return CAR_BODY_TYPES.COUPE;
    if (model.includes('Corolla') || model.includes('Civic') || model.includes('Onix Plus'))
      return CAR_BODY_TYPES.SEDAN;
    return CAR_BODY_TYPES.HATCH;
  }
}

/**
 * Singleton instance of CarStore
 */
export const carStore = new CarStore();
