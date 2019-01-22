import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { path } from 'ramda';

const json: any = {
    reports: { nl: 'Reports'},
    'recycling-processes': { nl: 'Recycling Processes' },
    'recycling-partners': { nl: 'Recycling Partners'},
    proxies: { nl: 'Proxies'},
    'audit-trial': { nl: 'Audit Trial'},
    fallback: { nl: 'No page content available' }
};

@Component({
    templateUrl: './help-section.page.html',
})

export class HelpSectionPageComponent implements OnInit {

    public text: string;

    constructor(
        private router: ActivatedRoute
    ) {}

    ngOnInit() {
        this.setText(this.router.snapshot.params);
        this.watchOnSlugChanges();
    }

     private watchOnSlugChanges() {
         this.router.params.subscribe((params) => this.setText(params));
     }

     private setText(params) {
        if (params['section']) {
            this.text = path([params['section'].toLowerCase(), 'nl'], json);
        }

        if (!this.text) {
            this.text = json.fallback.nl;
        }
     }

}
