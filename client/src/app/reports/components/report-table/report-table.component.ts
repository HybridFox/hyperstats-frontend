import { Component, Input } from '@angular/core';
import { Report } from '../../store/reports/types';

@Component({
    selector: 'app-report-table',
    templateUrl: './report-table.component.html',
})
export class ReportTableComponent {
    @Input() public reports: Report[];
    @Input() public userIsRecycler: boolean;
}
