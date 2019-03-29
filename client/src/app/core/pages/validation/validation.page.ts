import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { select } from '@angular-redux/store';
import { AuthActions } from '@store/auth';
import { ToastrService } from 'ngx-toastr';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { STATUS_TYPES } from 'src/lib/constants';
import { UserInterface } from '@store/auth/auth.interface';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './validation.page.html',
})
export class ValidationPageComponent implements OnDestroy, OnInit {
  @select(['auth', 'user', 'result']) public user$: Observable<UserInterface>;

  public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
  public statusTypes = STATUS_TYPES;

  constructor(
    private authAction: AuthActions,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  public ngOnInit() {
    this.user$
    .pipe(
      takeUntil(this.componentDestroyed$),
    )
    .subscribe(user => {
      if (user && user.status.type === STATUS_TYPES.ACTIVATED && user.validation.isValidated && user.company) {
        return this.router.navigate(['/']);
      }
    });
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  public resendMail() {
    this.user$.subscribe((user) => {
      this.authAction.resendValidateMail(user)
        .then(() => {
          this.toastrService.success(
            ngxExtract('TOAST.RESEND-EMAIL.DESCRIPTION') as string,
            ngxExtract('TOAST.RESEND-EMAIL.TITLE') as string
          );
        }).catch((error) => {
          this.toastrService.error(
            ngxExtract('TOAST.RESEND-EMAIL.ERROR.DESCRIPTION') as string,
            ngxExtract('TOAST.RESEND-EMAIL.ERROR.TITLE') as string
          );
        });
    });
  }
}
