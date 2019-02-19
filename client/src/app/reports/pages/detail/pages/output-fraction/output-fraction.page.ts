import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { FormHelper } from '@helpers/form.helper';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { OutputFraction } from '../../../../reports.types';

@Component({
 templateUrl: './output-fraction.page.html',
})
export class OutputFractionPageComponent implements OnInit {
 public form: any;
 public totalWeight = 0;

 private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

 constructor(
   public codesService: CodesService,
   public formData: FormDataService,
   private toastrService: ToastrService,
   private router: Router,
   private activatedRoute: ActivatedRoute
 ) {}

 public ngOnInit() {
   this.form = this.formData.getFormData().get('outputFraction');

   this.form.valueChanges.pipe(
     takeUntil(this.componentDestroyed$),
   ).subscribe((value) => {
     this.handleFormChanges(value);
   });
 }

 public handleFormChanges(changes: OutputFraction[]) {
   this.totalWeight = changes.filter(item => item.mass !== '').map(item => parseInt(item.mass, 10)).reduce((acc, value) => acc + value);
 }

 public addOutputFraction() {
   this.formData.addOutputElement();
 }

 public previousStep() {
   this.router.navigate(['../additives'], {relativeTo: this.activatedRoute});
 }

 public nextStep() {
   FormHelper.markAsDirty(this.form);

   if (this.form.valid) {
     this.router.navigate(['../recycling-efficiency'], {relativeTo: this.activatedRoute});
   } else {
     this.toastrService.error('GENERAL.LABELS.INVALID_FORM');
   }
 }
}
