import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const overview = selectDenormalized({
  schema: schema.report,
  selector: 'reports.reports.overview.result',
});

export const overviewLoading = ['reports', 'reports', 'overview', 'loading'];
export const overviewError = ['reports', 'reports', 'overview', 'error'];
