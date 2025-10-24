// Database Types
export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  date_of_birth?: string;
  erp_customer_id: string; // Maps to IdCard
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentAccessLog {
  id: string;
  user_id: string;
  document_id: string;
  access_type: 'view' | 'download_pdf' | 'download_xml';
  accessed_at: string;
}

export interface CustomerPreference {
  id: string;
  user_id: string;
  preference_key: string;
  preference_value: string;
  created_at: string;
  updated_at: string;
}

// Document Types
export interface Document {
  id: string;
  document_type: string;
  document_number: string;
  date: string;
  amount: number;
  status: string;
  customer_id: string;
}

// API Response Types
export interface DocumentsResponse {
  documents: Document[];
  total: number;
  page: number;
  per_page: number;
}

// Form Types
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  dateOfBirth?: string;
  idCard: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
