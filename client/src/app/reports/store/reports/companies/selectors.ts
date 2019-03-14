import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const companies = selectDenormalized({
  schema: schema.report,
  selector: 'reports.reports.companies.result',
});

export const companiesLoading = ['reports', 'reports', 'companies', 'loading'];
export const companiesError = ['reports', 'reports', 'companies', 'error'];
