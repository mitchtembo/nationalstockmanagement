// Types definition for Impilo Stock Management System API

// Common types
export type DrugCategory = 'ANTIBIOTIC' | 'PAINKILLER' | 'CARDIOVASCULAR' | 'RESPIRATORY' | 'MENTAL_HEALTH';
export type MeasurementUnit = 'TABLET' | 'CAPSULE' | 'MILLILITER' | 'GRAM';
export type BatchStatus = 'IN_STOCK' | 'LOW_STOCK' | 'EXPIRED' | 'OUT_OF_STOCK';
export type TransactionType = 'INCOMING' | 'DISPENSATION' | 'TRANSFER' | 'ADJUSTMENT';

// Schema interfaces
export interface Province {
  id?: number;
  name: string;
}

export interface District {
  id?: number;
  name: string;
  province?: Province;
}

export interface Facility {
  id?: number;
  province?: Province;
  district?: District;
  provinceName?: string;
  districtName?: string;
  recencyDistrict?: string;
  name: string;
  datimSiteName?: string;
  datimOrgId?: string;
  facilityId?: string;
  provinceCode?: string;
  districtCode?: string;
  ehrVersion?: string;
  activation?: string;
  latitude?: number;
  longitude?: number;
}

export interface Drug {
  id?: number;
  name: string;
  genericName?: string;
  manufacturer?: string;
  category?: DrugCategory;
  unitPrice?: number;
  measurementUnit?: MeasurementUnit;
  stockBatches?: StockBatch[];
}

export interface StockBatch {
  id?: number;
  drug?: Drug;
  facility?: Facility;
  batchNumber: string;
  manufacturingDate?: Date;
  expiryDate?: Date;
  initialQuantity: number;
  currentQuantity: number;
  status?: BatchStatus;
}

export interface StockTransaction {
  id?: number;
  drug?: Drug;
  transactionDate?: Date;
  transactionType?: TransactionType;
  quantity: number;
  sourceFacility?: Facility;
  destinationFacility?: Facility;
}

export interface FacilityStock {
  id?: number;
  facility?: Facility;
  drug?: Drug;
  stockLevel: number;
  reOrderLevel?: number;
  minLevel?: number;
  stockBatch?: StockBatch;
  lastUpdated?: Date;
}

export interface StockRequestDTO {
  drugId: number;
  requestingFacilityId: number;
  quantity: number;
}

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  otp?: string;
  lastLogin?: Date;
  roles?: string[];
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  authorities?: GrantedAuthority[];
}

export interface GrantedAuthority {
  authority: string;
}

export interface UserDetails {
  username: string;
  authorities?: GrantedAuthority[];
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  password?: string;
  enabled?: boolean;
}

export interface UserLoginDto {
  username: string;
  password: string;
}

export interface UserRegistrationDto {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Pagination types
export interface Pageable {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface PageableObject {
  paged?: boolean;
  pageNumber?: number;
  pageSize?: number;
  unpaged?: boolean;
  offset?: number;
  sort?: SortObject;
}

export interface SortObject {
  sorted?: boolean;
  unsorted?: boolean;
  empty?: boolean;
}

export interface Page<T> {
  totalElements: number;
  totalPages: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  size?: number;
  content: T[];
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  empty?: boolean;
}

export type PageDrug = Page<Drug>;
export type PageUser = Page<User>; 