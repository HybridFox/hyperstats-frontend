import { Component, OnInit, OnDestroy } from '@angular/core';
import countryList from 'country-list';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, distinctUntilChanged, filter } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { equals, prop } from 'ramda';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { ToastrService } from 'ngx-toastr';

import { RecyclingPartnerActions, RecyclingPartnerSelector } from '../../store';
import { Option } from '@ui/form-fields/components/select/select.types';

@Component({
  templateUrl: './recycling-partner.page.html',
})
export class RecyclingPartnerPageComponent implements OnInit, OnDestroy {
  @select(RecyclingPartnerSelector.detail.result) public recyclingPartner$: Observable<any>;

  public countryList: Option[];
  public partner: any;

  private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
  private recyclingPartnerId: string = null;
  private partnerSubscription: Subscription;

  constructor(
    private recyclingPartnerActions: RecyclingPartnerActions,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.countryList = countryList.getData().map(({code, name}) => ({
      value: code,
      label: name,
    }));

    this.route.params
      .pipe(
        takeUntil(this.componentDestroyed$),
        distinctUntilChanged()
      )
      .subscribe(params => {
        this.recyclingPartnerId = params.recyclingPartner;
        this.fetchPartnerIfNeeded();
      });
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  public save(recyclingPartner: any) {
    let promise: Promise<any>;

    if (this.recyclingPartnerId && this.recyclingPartnerId !== 'new') {
      promise = this.recyclingPartnerActions.update(this.recyclingPartnerId, recyclingPartner).toPromise();
    } else {
      promise = this.recyclingPartnerActions.create(recyclingPartner).toPromise();
    }
    promise
      .then((response) => {
          this.toastrService.success(
              ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.SUCCESS.DESCRIPTION') as string,
              ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.SUCCESS.TITLE') as string
          );

          this.router.navigate([`../${response._id}`], { relativeTo: this.route });
      })
      .catch(() => {
          this.toastrService.error(
              ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.ERROR.DESCRIPTION') as string,
              ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.ERROR.TITLE') as string
          );
      });
  }

  public remove(id: string) {
    this.recyclingPartnerActions.delete(id)
        .toPromise()
        .then(() => {
            this.toastrService.success(
                ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.SUCCESS.TITLE') as string
            );

            this.router.navigate(['../'], { relativeTo: this.route });
        })
        .catch(() => {
            this.toastrService.error(
                ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.ERROR.TITLE') as string
            );
        });
}

  private fetchPartnerIfNeeded() {
    if (
      !this.recyclingPartnerId ||
      this.recyclingPartnerId === 'new' ||
      (this.partner && prop('_id', this.partner) === this.recyclingPartnerId)
    ) {
        return this.partner = null;
    }

    if (this.partnerSubscription) {
        this.partnerSubscription.unsubscribe();
    }

    this.recyclingPartnerActions.fetchDetail(this.recyclingPartnerId).toPromise();
    this.partnerSubscription = this.recyclingPartner$
        .pipe(takeUntil(this.componentDestroyed$))
        .pipe(filter((partner) => !this.partner || (partner && !equals(partner, this.partner))))
        .subscribe((partner) => {
            this.partner = partner;
        });
  }

}