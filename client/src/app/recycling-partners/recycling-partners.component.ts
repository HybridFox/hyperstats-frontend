
import { Component, OnInit } from '@angular/core';
import { RecyclingPartnerActions, RecyclingPartnerSelector } from './store';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recycling-partners',
  templateUrl: './recycling-partners.component.html',
})

export class RecyclingPartnersComponent implements OnInit {
  @select(RecyclingPartnerSelector.list.result) public recyclingPartners$: Observable<any>;

  public recyclingPartners = [];
  public recyclingPartnersLinks = [];

  constructor(
    private recyclingPartnerActions: RecyclingPartnerActions,
  ) {}

  public ngOnInit() {
    this.recyclingPartnerActions.fetchAll().toPromise();
    this.recyclingPartners$.subscribe((recyclingPartners) => {
      if (!Array.isArray(recyclingPartners)) {
        return;
      }
      this.recyclingPartners = recyclingPartners;
      this.recyclingPartnersLinks = this.recyclingPartners.map((partner) => {
        return {'link': partner._id, 'label': partner.data.name};
      });
    });
  }
}
