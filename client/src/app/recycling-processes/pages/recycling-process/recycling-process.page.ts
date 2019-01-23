import { Component, OnInit, } from '@angular/core';
import { RecyclingProcessesActions } from '../../store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recycling-process-page',
  templateUrl: './recycling-process.page.html',
})
export class RecyclingProcessPageComponent implements OnInit {
    constructor(
        private router: Router,
        private recyclingProcessesActions: RecyclingProcessesActions,
    ) {}

    public ngOnInit() {

    }
}
