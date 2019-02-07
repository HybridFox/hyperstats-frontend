
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecyclingPartnerActions, RecyclingPartnerSelector } from './store';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recycling-partners',
  templateUrl: './recycling-partners.component.html',
})

export class RecyclingPartnersComponent implements OnInit, OnDestroy {
  @select(RecyclingPartnerSelector.list.result) public recyclingPartners$: Observable<any>;

  private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

  public recyclingPartners = [];
  public recyclingPartnersLinks = [];

  constructor(
    private recyclingPartnerActions: RecyclingPartnerActions,
  ) {}

  public ngOnInit() {
    this.recyclingPartnerActions.fetchAll().toPromise();
    this.recyclingPartners$
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe((recyclingPartners) => {
      if (!Array.isArray(recyclingPartners)) {
        return;
      }
      this.recyclingPartners = recyclingPartners;
      this.recyclingPartnersLinks = this.recyclingPartners.map((partner) => {
        return {'link': partner._id, 'label': partner.data.name};
      });
    });
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
