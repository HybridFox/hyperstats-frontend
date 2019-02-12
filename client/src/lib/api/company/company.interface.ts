export interface CompanyInterface {
  name: string;
  vat: string;
  address: {
    street: string;
    number: string;
    box?: string;
    zipCode: number;
    city: string;
    country: string;
  };
}
