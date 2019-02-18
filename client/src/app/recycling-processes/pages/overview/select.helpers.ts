import { filter, map } from 'rxjs/operators';
import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { Observable } from 'rxjs';
import reduce from 'ramda/es/reduce';

export const processToMenuItemObservableHandler = (obs$: Observable<any>): Observable<any> => obs$
    .pipe(filter((processes: any[]): boolean => Array.isArray(processes)))
    .pipe(map((processes: any[]): any[] => {
        return reduce((acc: any[], process: any): any[] => process ? acc.concat({
            label: process.data.name,
            link: process._id,
            class: process.meta.activated ? 'activated' : 'deactivated'
        } as MenuItem) : acc, [])(processes);
    }));
