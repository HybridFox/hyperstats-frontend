export interface CompanyInterface {
  name: string;
  address: {
    street: string;
    number: string;
    box: string;
    zipCode: number;
    city: string;
    country: string;
  };
}
