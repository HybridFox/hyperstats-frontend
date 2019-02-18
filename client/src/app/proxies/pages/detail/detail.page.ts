import { Component } from '@angular/core';

@Component({
  templateUrl: './detail.page.html',
})

export class DetailPageComponent  {
  public proxies = [
    {
      name: 'Bebat VZW',
      types: [
        {
          name: 'Alkaline - Nickel Metal',
          multiple: false,
        },
        {
          name: 'Zinc Carbon',
          multiple: true,
        }
      ]
    },
  ];

  public revokeProxy() {
    console.log('revokeProxy');
  }
}
