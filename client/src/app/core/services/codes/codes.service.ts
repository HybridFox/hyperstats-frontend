import { Injectable } from '@angular/core';

@Injectable()
export class CodesService {
  public elements() {
    return [
      {
        label: 'Magnese',
        key: 'ma'
      },
      {
        label: 'Mercury',
        key: 'me'
      },
      {
        label: 'Carbon',
        key: 'cb'
      },
      {
        label: 'Plastics',
        key: 'pl'
      },
      {
        label: 'Electrolyte',
        key: 'ec'
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
}
