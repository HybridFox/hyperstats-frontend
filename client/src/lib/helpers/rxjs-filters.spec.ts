import * as filters from './rxjs-filters';
import { of } from 'rxjs';

describe('RxJs Filters', () => {
    it('Should check if isNotNil', () => {
        const isNil = filters.isNotNil(of(null));
    });
});
