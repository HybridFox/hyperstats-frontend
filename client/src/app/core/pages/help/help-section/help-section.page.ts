import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { path } from 'ramda';

const json: any = {
    reports: { nl: 'Reports'},
    recyclingprocesses: { nl: 'Recycling Processes' },
    recyclingpartners: { nl: 'Recycling Partners'},
    proxies: { nl: 'Proxies'},
    audittrial: { nl: 'Audit Trial'},
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
        this.text = path([this.router.snapshot.params['section'], 'nl'], json);

        if (!this.text) {
            this.text = json.fallback.nl;
        }
     }


}
