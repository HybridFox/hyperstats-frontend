import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { Option } from '@ui/form-fields/components/select/select.types';
import pathOr from 'ramda/es/pathOr';

const ALL_MENU_ITEM: MenuItem = {
  link: ['./'],
  label: 'All',
};

const mapper = (customMapFn: Function, allOption?: MenuItem) =>  (obs$: Observable<any>) => {
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
        }, allOption ? [allOption] : []);
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

export const mapRecyclingProcessesToMenuItemsWithAll = mapper((process): MenuItem => ({
  link: process._id,
  label: process.data.name,
}), ALL_MENU_ITEM);

export const mapToSiteMenuItems = (obs$: Observable<any>) => {
  return obs$
    .pipe(
      filter((process: any[]) => {
        return !!process;
      }),
      map((process: any[]) => {
        return pathOr([], ['data', 'steps'], process).map((step): MenuItem => ({
          link: ['./'],
          queryParams: { step: step.uuid },
          label: step.description,
        }));
      })
    );
};

