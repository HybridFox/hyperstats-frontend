
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select$ } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';

import { RecyclingPartnerActions, RecyclingPartnerSelector } from '../../store';
import { recyclingPartners } from './overview.helper';

@Component({
  selector: 'app-recycling-partners',
  templateUrl: './overview.page.html',
})

export class RecyclingPartnersComponent implements OnInit, OnDestroy {
  @select$(RecyclingPartnerSelector.list.result, recyclingPartners) public recyclingPartners$: Observable<any>;

  private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

  public recyclingPartners = [];
  public recyclingPartnersLinks = [];

  constructor(
    private recyclingPartnerActions: RecyclingPartnerActions,
  ) { }

  public ngOnInit() {
    this.recyclingPartnerActions.fetchAll().toPromise();
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
