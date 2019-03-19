import { NgModule,  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreService } from '@store/store.service';
import { LoadingModule } from '@ui/loading';
import { FormFieldsModule } from '@ui/form-fields';
import { SharedModule } from '@shared/shared.module';

import { ManageRecyclersRoutingModule } from './manage-recyclers-routing.module';

import { Pages } from './pages';
import { Components } from './components';

@NgModule({
  declarations: [
    Pages,
    Components,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    ManageRecyclersRoutingModule,
    SharedModule,
    LoadingModule,
    FormFieldsModule,
  ],
})
export class ManageRecyclersModule {}
