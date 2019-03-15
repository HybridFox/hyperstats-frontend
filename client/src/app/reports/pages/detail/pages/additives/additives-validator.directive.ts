import { FormGroup } from '@angular/forms';
import isEmpty from 'ramda/es/isEmpty';
import { debug } from 'util';

export function validateAdditives(control: FormGroup) {
  const type = control.get('type').value;
  const weight = control.get('weight').value;

  if (!isEmpty(type) && weight) {
    control.controls['type'].setErrors(null);
    control.controls['weight'].setErrors(null);
    return null;
  } else if (!isEmpty(type) || weight) {
    Object.keys(control.controls).map((controlName) => {
      control.get(controlName).markAsDirty({onlySelf: true});
    });
    weight ? control.controls['type'].setErrors({'typeRequired': true}) : control.controls['weight'].setErrors({'weightRequired': true});
    return { isRequired: true };
  }
  control.controls['type'].setErrors(null);
  control.controls['weight'].setErrors(null);
  return null;
}
