import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, select$ } from '@angular-redux/store';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import prop from 'ramda/es/prop';

import { CompaniesActions } from '../../store/companies/actions';
import { CompanySelector } from '../../store/companies/selectors';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { TranslateService } from '@ngx-translate/core';
import { companiesToSelectOptions } from '@helpers/select.helpers';
import { Option } from '@ui/form-fields/components/select/select.types';
import { CompanyType } from '@api/company';

@Component({
  templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
  @select(CompanySelector.detail.result) public company$: BehaviorSubject<any>;
  @select(CompanySelector.detail.loading) public loading$: BehaviorSubject<boolean>;
  @select$(CompanySelector.overview.result, companiesToSelectOptions) public companyOptions$: Observable<Option>;

  private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companiesActions: CompaniesActions,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) { }

  public ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.componentDestroyed$),
      )
      .subscribe(({ id }) => {
        this.companiesActions.fetchById(id).subscribe();
      });

    this.companiesActions.fetchByType([CompanyType.R]).toPromise();
  }

  public save(company: any) {
    let promise: Promise<any> = null;

    if (prop('_id', company)) {
      promise = this.companiesActions.update(prop('_id', company), company).toPromise();
    } else {
      promise = this.companiesActions.create(company).toPromise();
    }

    promise
      .then((response) => {
        this.toastrService.success(
          ngxExtract('TOAST.COMPANY-SAVE.SUCCESS.DESCRIPTION') as string,
          ngxExtract('TOAST.COMPANY-SAVE.SUCCESS.TITLE') as string
        );

        this.router.navigate([`../${response._id}`], { relativeTo: this.route });
      })
      .catch(() => {
        this.toastrService.error(
          ngxExtract('TOAST.COMPANY-SAVE.ERROR.DESCRIPTION') as string,
          ngxExtract('TOAST.COMPANY-SAVE.ERROR.TITLE') as string
        );
      });

  }

  public remove(id) {
    this.companiesActions.delete(id).toPromise()
      .then(() => {
        this.toastrService.success(
          ngxExtract('TOAST.COMPANY-REMOVE.SUCCESS.DESCRIPTION') as string,
          ngxExtract('TOAST.COMPANY-REMOVE.SUCCESS.TITLE') as string
        );

        this.router.navigate([`../`], { relativeTo: this.route });
      })
      .catch((error) => {
        this.toastrService.error(
          ngxExtract('TOAST.COMPANY-REMOVE.ERROR.DESCRIPTION') as string,
          ngxExtract('TOAST.COMPANY-REMOVE.ERROR.TITLE') as string
        );
      });

  }

  public toggleActivation({ id, value: isActivate }) {
    const type = this.translateService.instant(
      isActivate ?
        ngxExtract('TOAST.COMPANY-TOGGLE.ACTIVATED') :
        ngxExtract('TOAST.COMPANY-TOGGLE.DEACTIVATED')
    );


    const promise: Promise<any> = isActivate ?
      this.companiesActions.activate(id).toPromise() :
      this.companiesActions.deactivate(id).toPromise();

    promise
      .then(() => {
        this.toastrService.success(
          this.translateService.instant('TOAST.COMPANY-TOGGLE.SUCCESS.DESCRIPTION', { type }) as string,
          this.translateService.instant('TOAST.COMPANY-TOGGLE.SUCCESS.TITLE', { type }) as string
        );
      })
      .catch(() => {
        this.toastrService.error(
          this.translateService.instant('TOAST.COMPANY-TOGGLE.ERROR.DESCRIPTION', { type }) as string,
          this.translateService.instant('TOAST.COMPANY-TOGGLE.ERROR.TITLE', { type }) as string
        );
      });
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
