import { FormGroup } from '@angular/forms';
import isEmpty from 'ramda/es/isEmpty';
import { debug } from 'util';

export function validateAdditives(control: FormGroup) {
  const type = control.get('type').value;
  const weight = control.get('weight').value;
  if (!isEmpty(type) && weight) {
    return null;
  } else if (!isEmpty(type) || weight) {
    return { isRequired: true };
  }
  return null;
}
