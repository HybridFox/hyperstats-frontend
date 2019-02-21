import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-report-table',
    templateUrl: './report-table.component.html',
})
export class ReportTableComponent {
    @Input() public reports: any[];
}
