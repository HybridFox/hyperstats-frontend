import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const list = selectDenormalized({
  schema: schema.report,
  selector: 'reports.reports.list.result',
});

export const listLoading = ['reports', 'reports', 'list', 'loading'];
export const listError = ['reports', 'reports', 'list', 'error'];
