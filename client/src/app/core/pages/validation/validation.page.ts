import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { AuthActions } from '@store/auth';
import { ToastrService } from 'ngx-toastr';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { STATUS_TYPES } from 'src/lib/constants';

@Component({
    templateUrl: './validation.page.html',
})
export class ValidationPageComponent {
  @select(['auth', 'user', 'result']) public user$: Observable<any>;

  public statusTypes: any[] = STATUS_TYPES;

  constructor(
    private authAction: AuthActions,
    private toastrService: ToastrService
  ) { }

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
