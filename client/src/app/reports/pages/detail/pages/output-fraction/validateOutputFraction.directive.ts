import { FormGroup } from '@angular/forms';
import { CLASSIFICATIONS } from './classifications.const';

export function validateOutputFraction (control: FormGroup) {
  const virgin = control.get('virginClassification').value;
  const company = control.get('elementDestinationCompany');
  const industry = control.get('elementDestinationIndustry');
  const step = control.get('assignedStep').value;
  const classifications = CLASSIFICATIONS;

  if (virgin === classifications.INTERMEDIATE) {
    control.controls['assignedStep'].setErrors({'required': true});
    return { isRequired: true };
  }
  if (!company.value) {
    control.controls['elementDestinationCompany'].setErrors({'required': true});
    return { isRequired: true };
  }
  if (!industry.value) {
    control.controls['elementDestinationIndustry'].setErrors({'required': true});
    return { isRequired: true };
  }
  control.controls['elementDestinationCompany'].setErrors(null);
  control.controls['elementDestinationIndustry'].setErrors(null);
  return null;
}
