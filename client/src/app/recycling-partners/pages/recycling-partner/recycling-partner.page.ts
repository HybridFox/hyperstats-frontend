import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, distinctUntilChanged, filter } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { equals, prop, pathOr } from 'ramda';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { ToastrService } from 'ngx-toastr';

import { RecyclingPartnerActions, RecyclingPartnerSelector } from '../../store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './recycling-partner.page.html',
})
export class RecyclingPartnerPageComponent implements OnInit, OnDestroy {
  @select(RecyclingPartnerSelector.detail.result) public recyclingPartner$: Observable<any>;

  public partner: any;
  public recyclingPartnerId: string = null;

  private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
  private partnerSubscription: Subscription;

  constructor(
    private recyclingPartnerActions: RecyclingPartnerActions,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private translateService: TranslateService,
  ) { }

  public ngOnInit() {
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
      promise = this.recyclingPartnerActions.update(recyclingPartner).toPromise();
    } else {
      promise = this.recyclingPartnerActions.create(recyclingPartner).toPromise();
    }
    promise
      .then((response) => {
        this.toastrService.success(
          ngxExtract('TOAST.RECYCLING-PARTNER-SAVE.SUCCESS.DESCRIPTION') as string,
          ngxExtract('TOAST.RECYCLING-PARTNER-SAVE.SUCCESS.TITLE') as string
        );

        this.router.navigate([`../${response._id}`], { relativeTo: this.route });
      })
      .catch(() => {
        this.toastrService.error(
          ngxExtract('TOAST.RECYCLING-PARTNER-SAVE.ERROR.DESCRIPTION') as string,
          ngxExtract('TOAST.RECYCLING-PARTNER-SAVE.ERROR.TITLE') as string
        );
      });
  }

  public remove(id: string) {
    this.recyclingPartnerActions.delete(id)
      .toPromise()
      .then(() => {
        this.toastrService.success(
          ngxExtract('TOAST.RECYCLING-PARTNER-REMOVE.SUCCESS.DESCRIPTION') as string,
          ngxExtract('TOAST.RECYCLING-PARTNER-REMOVE.SUCCESS.TITLE') as string
        );

        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .catch(() => {
        this.toastrService.error(
          ngxExtract('TOAST.RECYCLING-PARTNER-REMOVE.ERROR.DESCRIPTION') as string,
          ngxExtract('TOAST.RECYCLING-PARTNER-REMOVE.ERROR.TITLE') as string
        );
      });
  }

  public toggleActivation(id) {
    const isCurrentlyActive = pathOr(false, ['meta', 'activated'])(this.partner);

    const type = this.translateService.instant(
      isCurrentlyActive ?
        ngxExtract('TOAST.RECYCLING-PARTNER-TOGGLE.DEACTIVATED') :
        ngxExtract('TOAST.RECYCLING-PARTNER-TOGGLE.ACTIVATED')
    );

    const promise: Promise<any> = isCurrentlyActive ?
      this.recyclingPartnerActions.deactivate(id).toPromise() :
      this.recyclingPartnerActions.activate(id).toPromise();

    promise
      .then(() => {
        this.toastrService.success(
          this.translateService.instant('TOAST.RECYCLING-PARTNER-TOGGLE.SUCCESS.DESCRIPTION', { type }) as string,
          this.translateService.instant('TOAST.RECYCLING-PARTNER-TOGGLE.SUCCESS.TITLE', { type }) as string
        );
      })
      .catch(() => {
        this.toastrService.error(
          this.translateService.instant('TOAST.RECYCLING-PARTNER-TOGGLE.ERROR.DESCRIPTION', { type }) as string,
          this.translateService.instant('TOAST.RECYCLING-PARTNER-TOGGLE.ERROR.TITLE', { type }) as string
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

    this.recyclingPartnerActions.fetchById(this.recyclingPartnerId).toPromise();
    this.partnerSubscription = this.recyclingPartner$
      .pipe(takeUntil(this.componentDestroyed$))
      .pipe(filter((partner) => !this.partner || (partner && !equals(partner, this.partner))))
      .subscribe((partner) => {
        this.partner = partner;
      });
  }

}
