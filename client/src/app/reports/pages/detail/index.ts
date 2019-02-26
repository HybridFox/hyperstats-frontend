export * from './pages/new';
export * from './pages/input-fraction';
export * from './pages/additives';
export * from './pages/output-fraction';
export * from './pages/recycling-efficiency';
export * from './pages/additional-information';
export * from './pages/file';

import { NewPageComponent } from './pages/new';
import { InputFractionPageComponent } from './pages/input-fraction';
import { AdditivesPageComponent } from './pages/additives';
import { OutputFractionPageComponent } from './pages/output-fraction';
import { RecyclingEfficiencyPageComponent } from './pages/recycling-efficiency';
import { AdditionalInformationPageComponent } from './pages/additional-information';
import { ReportPageComponent } from './report.page';
import { FilePageComponent } from './pages/file';

import { StepWrapperPageComponent } from './pages/step-wrapper/step-wrapper.page';
export { StepWrapperPageComponent } from './pages/step-wrapper/step-wrapper.page';

export const Pages = [
  NewPageComponent,
  InputFractionPageComponent,
  AdditivesPageComponent,
  OutputFractionPageComponent,
  RecyclingEfficiencyPageComponent,
  AdditionalInformationPageComponent,
  FilePageComponent,
  ReportPageComponent,
  StepWrapperPageComponent,
];

export {
  NewPageComponent,
  InputFractionPageComponent,
  AdditivesPageComponent,
  OutputFractionPageComponent,
  RecyclingEfficiencyPageComponent,
  AdditionalInformationPageComponent,
  ReportPageComponent,
  FilePageComponent,
};
