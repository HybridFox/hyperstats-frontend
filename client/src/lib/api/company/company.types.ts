export interface CompanyAddress {
  street: string;
  number: string;
  box?: string;
  zipCode: number;
  city: string;
  country: string;
}

export interface CompanyContactPerson {
  name: string;
  function: string;
  phone: string;
  mobile: string;
  email: string;
}

export interface CompanyData {
  name: string;
  vat: string;
  address: CompanyAddress;
  contactPerson: CompanyContactPerson;
}

export interface CompanyMeta {
  isActive: boolean;
  type: string;
}

export enum CompanyType {
  R = 'R',
  RP = 'RP',
  CO = 'CO',
  AO = 'AO'
}
