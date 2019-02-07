import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-companies-table',
    templateUrl: './companies-table.component.html',
})
export class CompaniesTableComponent {
    @Input() public companies: any[];
}
