import { filter } from 'rxjs/operators';
import { not, isEmpty } from 'ramda';

export const isNotNil = filter(not(isEmpty));
