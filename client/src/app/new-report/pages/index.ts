export * from './new';
export * from './input-fraction';
export * from './additives';
export * from './output-fraction';
export * from './recycling-efficiency';
export * from './additional-information';

import { NewPageComponent } from './new';
import { InputFractionPageComponent } from './input-fraction';
import { AdditivesPageComponent } from './additives';
import { OutputFractionPageComponent } from './output-fraction';
import { RecyclingEfficiencyPageComponent } from './recycling-efficiency';
import { AdditionalInformationPageComponent } from './additional-information';

export const Pages = [
  NewPageComponent,
  InputFractionPageComponent,
  AdditivesPageComponent,
  OutputFractionPageComponent,
  RecyclingEfficiencyPageComponent,
  AdditionalInformationPageComponent
];
