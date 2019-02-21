import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { UploadInputComponent } from './upload-input/upload-input.component';
import { UploadPreviewComponent } from './upload-preview/upload-preview.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
  ],
  providers: [],
  declarations: [
    UploadInputComponent,
    UploadPreviewComponent
  ],
  exports: [
    UploadInputComponent,
    UploadPreviewComponent
  ],
})
export class UploadModule { }
