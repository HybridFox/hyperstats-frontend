export interface CompanyInterface {
 data: {
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
  contactPerson: {
    name: string;
    function: string;
    phone: string;
    mobile: string;
    email: string;
  };
 };
 meta: {
   isActive: boolean,
   type: string
 };
}
