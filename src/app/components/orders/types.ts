export type Industry = 'Automotive' | 'Aerospace' | 'Medical' | 'Consumer' | 'Industrial' | 'Robotics' | 'Other';
export type DesignPhase = 'Prototype' | 'Early Production' | 'Full Production';
export type MaterialFlexibility = 'Strict' | 'Moderate' | 'Flexible';

export interface Customer {
  id: string;
  name: string;
}

export interface Project {
  name: string;
  industry: Industry;
  designPhase: DesignPhase;
  description: string;
}

export interface ComplianceLegal {
  ncaRequired: boolean;
  mpProfileRequired: boolean;
  exportControl: 'None' | 'ITAR' | 'EAR';
  additionalNotes?: string;
}

export interface FinancialTerms {
  paymentTerms: string;
  downpayment: number;
  fixedMaterialPricing: boolean;
  sampleCosts: 'Standard' | 'Custom';
  fixedPricingPeriod: number; // in months
  productionTerminationClause: boolean;
  disputeWindow?: number; // in days
}

export interface BasicInfo {
  customer: Customer;
  project: Project;
  materialFlexibility: MaterialFlexibility;
  compliance: ComplianceLegal;
  financialTerms: FinancialTerms;
}

export interface Documentation {
  designRecord: boolean;
  processFlow: boolean;
  processFMEA: boolean;
  controlPlan: boolean;
}

export interface DFM {
  materialConsiderations: string[];
  surfaceFinish: string[];
  gdtStrategy: string[];
}

export interface Tooling {
  specialTools: boolean;
  customFixtures: boolean;
  additionalSupports: boolean;
}

export interface Quality {
  measurementStrategy: string;
  inspectionRequirements: string[];
}

export interface ManufacturingRequirements {
  documentation: Documentation;
  dfm: DFM;
  tooling: Tooling;
  quality: Quality;
}

export interface QuoteRequest {
  type: 'Firm' | 'Estimate' | 'DFM';
  deadline: Date;
  targetDate: Date;
}

export interface LineItem {
  partName: string;
  material: string;
  process: string;
  quantity: number;
  deliveryDate: Date;
}

export interface AttachedFile {
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface OrderReview {
  basicInfo: BasicInfo;
  requirements: ManufacturingRequirements;
  selectedSuppliers: Supplier[];
  lineItems: LineItem[];
  attachedFiles: AttachedFile[];
  quoteRequest: QuoteRequest;
}

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