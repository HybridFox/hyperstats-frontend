import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import { FormHelper } from '@helpers/form.helper';
import { ContactRepository } from '@api/contact';

@Component({
  templateUrl: './contact.page.html',
})
export class ContactPageComponent implements OnInit, OnDestroy {
  public contactForm: FormGroup;
  public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private contactRepository: ContactRepository,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      body: ['', Validators.required],
      subject: ['', Validators.required],
    });
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  public submit() {
    FormHelper.markAsDirty(this.contactForm);
    if (!this.contactForm.valid) {
      return this.toastrService.error(
        ngxExtract('TOAST.GENERAL.INVALID.DESCRIPTION') as string,
        ngxExtract('TOAST.GENERAL.INVALID.TITLE') as string
      );
    }

    this.contactRepository.sendMail({
      ...this.contactForm.value
    }).then(() => {
      this.toastrService.success(
        ngxExtract('TOAST.CONTACT.SUCCESS.DESCRIPTION') as string,
        ngxExtract('TOAST.CONTACT.SUCCESS.TITLE') as string
      );
      this.contactForm.reset();
    }).catch(() => {
      this.toastrService.error(
        ngxExtract('TOAST.CONTACT.ERROR.DESCRIPTION') as string,
        ngxExtract('TOAST.CONTACT.ERROR.TITLE') as string
      );
    });
  }
}
