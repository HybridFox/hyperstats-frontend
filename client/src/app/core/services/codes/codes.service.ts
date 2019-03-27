import { Injectable } from '@angular/core';

@Injectable()
export class CodesService {
  public elements() {
    return [
      {
        label: 'Magnese',
        key: 'ma',
        value: 'Magnese',
      },
      {
        label: 'Mercury',
        key: 'me',
        value: 'Mercury',
      },
      {
        label: 'Carbon',
        key: 'cb',
        value: 'Carbon',
      },
      {
        label: 'Plastics',
        key: 'pl',
        value: 'Plastics',
      },
      {
        label: 'Electrolyte',
        key: 'ec',
        value: 'Electrolyte',
      },
    ];
  }

  public years() {
    return Array((new Date()).getFullYear() - 2016 + 1).fill(0).map((_, idx) => 2016 + idx).map(val => ({
      label: val.toString(),
      value: val.toString()
    }));
  }

  public recyclingProcesses() {
    return [
      {
        label: 'Alkaline - Nickel Metal',
        value: 'Alkaline - Nickel Metal'
      },
      {
        label: 'Nikel - Alkaline Metal',
        value: 'Nikel - Alkaline Metal'
      },
    ];
  }

  public receivers() {
    return [
      {
        label: 'Eucobat',
        value: 'eucobat'
      },
      {
        label: 'Ecubat',
        value: 'ecubat'
      },
    ];
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
