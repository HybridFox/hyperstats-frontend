import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './file.page.html',
})
export class FilePageComponent implements OnInit {
  public form: any;

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.form = this.formData.getFormData().get('file');
  }
}
