import { NgModule,  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { FormFieldsModule } from '@ui/form-fields';

import { RecyclerRoutingModule } from './recycler-routing.module';

import { Pages } from './pages';
import { Components } from './components';

@NgModule({
  declarations: [
    Pages,
    Components,
  ],
  entryComponents: [],
  imports: [
    RecyclerRoutingModule,
    ReactiveFormsModule,

    SharedModule,
    FormFieldsModule,
    CommonModule,
  ],
  providers: [],
})
export class RecyclerModule { }
