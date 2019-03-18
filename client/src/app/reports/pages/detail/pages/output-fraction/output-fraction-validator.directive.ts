import { FormGroup } from '@angular/forms';
import { CLASSIFICATIONS } from './classifications.const';
import isEmpty from 'ramda/es/isEmpty';

export function validateOutputFraction (control: FormGroup) {
  const virgin = control.get('virginClassification').value;
  const step = control.get('assignedStep');
  const industry = control.get('elementDestinationIndustry');
  const company = control.get('elementDestinationCompany');
  const replacedMaterial = control.get('virginReplacedMaterial');
  const classifications = CLASSIFICATIONS;

  if (virgin === classifications.RECYCLING && (isEmpty(replacedMaterial.value) || replacedMaterial.value === null)) {
    control.controls['virginReplacedMaterial'].setErrors({'required': true});
    return { isRequired: true };
  }
  if (virgin === classifications.INTERMEDIATE && (isEmpty(step.value) || step.value === null)) {
    control.controls['assignedStep'].setErrors({'required': true});
    return { isRequired: true };
  }
  if (isEmpty(industry.value) && !industry.pristine) {
    industry.markAsDirty({onlySelf: true});
    control.controls['elementDestinationIndustry'].setErrors({'required': true});
    return { isRequired: true };
  }
  if (isEmpty(company.value) && !company.pristine) {
    company.markAsDirty({onlySelf: true});
    control.controls['elementDestinationCompany'].setErrors({'required': true});
    return { isRequired: true };
  }
  if (isEmpty(industry.value) && industry.pristine && virgin !== classifications.INTERMEDIATE
    || isEmpty(company.value) && company.pristine && virgin !== classifications.INTERMEDIATE)  {
    return { isRequired: true };
  }
  if (virgin !== classifications.INTERMEDIATE &&
    (isEmpty(industry.value) || !industry.value || isEmpty(company.value) || !company.value)) {
    return { isRequired: true };
  }
  control.controls['virginReplacedMaterial'].setErrors(null);
  control.controls['elementDestinationCompany'].setErrors(null);
  control.controls['elementDestinationIndustry'].setErrors(null);
  control.controls['assignedStep'].setErrors(null);
  return null;
}
