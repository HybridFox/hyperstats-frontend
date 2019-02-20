import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const detail = selectDenormalized({
  schema: schema.report,
  selector: 'reports.reports.detail.result',
});

export const detailLoading = ['reports', 'reports', 'detail', 'loading'];
export const detailError = ['reports', 'reports', 'detail', 'error'];
