export interface Supplier {
  id: number;
  name: string;
  location: string;
  isPreferred: boolean;
  capabilities: string[];
  materials: string[];
  qualityScore: number;
  onTimeRate: number;
  orders: number;
  lastOrder: string;
  // Additional fields for profile
  description?: string;
  technology?: string;
  supplyChainManager?: string;
  contactName?: string;
  contactInfo?: {
    phone: string;
    email: string;
  };
  workingHours?: string;
  address?: {
    street: string;
    city: string;
    region: string;
    country: string;
    postcode: string;
  };
}

export type SupplierTab = 'all' | 'preferred' | 'recent';

export interface SupplierFilters {
  capability: string;
  material: string;
  searchQuery: string;
} 