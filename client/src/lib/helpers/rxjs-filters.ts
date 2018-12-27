import { filter } from 'rxjs/operators';
import { negate, isNil } from 'lodash-es';

export const isNotNil = filter(negate(isNil));
