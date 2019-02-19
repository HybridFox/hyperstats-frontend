import { Component } from '@angular/core';

@Component({
    templateUrl: './reports.page.html',
})

export class ReportsPageComponent {
    public menuItems = [
        {link: [''], label: 'Alkaline - Nickel Metal'},
        {link: ['zinc'], label: 'Zinc Carbon'},
        {link: ['nickel'], label: 'Nickel Cadmium'},
    ];
}
