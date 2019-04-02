import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { path } from 'ramda';

import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

const helpPageContent: any = {
  reports: { en: ngxExtract('HELP.CONTENT.REPORTS') },
  'recycling-processes': { en: ngxExtract('HELP.CONTENT.RECYCLING-PROCESSES') },
  'recycling-partners': { en: ngxExtract('HELP.CONTENT.RECYCLING-PARTNERS') },
  proxies: { en: ngxExtract('HELP.CONTENT.PROXIES') },
  'audit-trail': { en: ngxExtract('HELP.CONTENT.AUDIT-TRAIL') },
  fallback: { en: ngxExtract('HELP.CONTENT.FALLBACK')  }
};

@Component({
  templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit {
  public text: string;

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setText(this.router.snapshot.params);
    this.watchOnSlugChanges();
  }

  private watchOnSlugChanges() {
    this.router.params.subscribe((params) => this.setText(params));
  }

  private setText(params) {
    if (params['section']) {
      this.text = path([params['section'].toLowerCase(), 'en'], helpPageContent);
    }

    if (!this.text) {
      this.text = helpPageContent.fallback.en;
    }
  }

}
