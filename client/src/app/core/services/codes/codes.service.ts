import { Injectable } from '@angular/core';

@Injectable()
export class CodesService {
  public years() {
    return Array((new Date()).getFullYear() - 2016 + 1).fill(0).map((_, idx) => 2016 + idx).map(val => ({
      label: val.toString(),
      value: val.toString()
    }));
  }

  public classifications() {
    return [
      {
        label: 'Recycling',
        value: 'Recycling',
      },
      {
        label: 'Recovery',
        value: 'Recovery',
      },
      {
        label: 'Thermal Disposal',
        value: 'Thermal Disposal',
      },
      {
        label: 'Land Disposal',
        value: 'Land Disposal',
      },
      {
        label: 'Delivery Third Party',
        value: 'Delivery Third Party',
      },
      {
        label: 'Intermediate',
        value: 'Intermediate',
      },
    ];
  }
}
