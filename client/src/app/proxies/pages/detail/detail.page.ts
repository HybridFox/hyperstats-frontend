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
          name: 'Alkaline',
        },
        {
          name: 'Zinc',
        }
      ]
    },
    {
      name: 'Stibat vzw',
      types: [
        {
          name: 'Alkaline',
        },
        {
          name: 'Zinc',
        }
      ]
    }
  ];

  public revokeProxy() {
    console.log('revokeProxy');
  }
}
