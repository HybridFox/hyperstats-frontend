import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { Option } from '@ui/form-fields/components/select/select.types';

const mapper = (customMapFn) =>  (obs$: Observable<any>) => {
    return obs$
        .pipe(
            filter((processes: any[]) => {
                return Array.isArray(processes);
            }),
            map((processes: any[]) => {
                return processes.reduce((acc, process) => {
                    if (!process) {
                        return acc;
                    }

                    return acc.concat(customMapFn(process));
                }, []);
            })
        );
};

export const mapRecyclingProcessesToOptions = mapper((process): Option => ({
    value: process._id,
    label: process.data.name,
}));

export const mapRecyclingProcessesToMenuItems = mapper((process): MenuItem => ({
    link: process._id,
    label: process.data.name,
}));
