import { filter } from 'rxjs/operators';
import { compose, not, isNil } from 'ramda';

export const isNotNil = filter(compose(not, isNil));
