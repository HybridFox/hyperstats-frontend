import { Component, OnInit, OnDestroy } from '@angular/core';
import countryList from 'country-list';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';

import { RecyclingPartnerActions, RecyclingPartnerSelector } from '../../store';
import { Option } from '@ui/form-fields/components/select/select.types';

@Component({
  templateUrl: './recycling-partner.page.html',
})
export class RecyclingPartnerPageComponent implements OnInit, OnDestroy {
  @select(RecyclingPartnerSelector.detail.result) public recyclingPartner$: Observable<any>;

  public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
  public countryList: Option[];

  constructor(
    private recyclingPartnerActions: RecyclingPartnerActions,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.countryList = countryList.getData().map(({code, name}) => ({
      value: code,
      label: name,
  }));

  this.route.params
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(params => {
        this.recyclingPartnerActions.fetchDetail(params.recyclingPartner).toPromise();
      });
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
