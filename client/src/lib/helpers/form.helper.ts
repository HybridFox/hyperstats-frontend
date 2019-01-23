import { FormGroup, FormArray } from '@angular/forms';
import { forEachObjIndexed } from 'ramda';

export class FormHelper {
    public static markAsDirty(formGroup: any): void {
        forEachObjIndexed(control => {
            if (control instanceof FormGroup || control instanceof FormArray) {
                return FormHelper.markAsDirty(control);
            }
            return control.markAsDirty(); // tslint:disable-line
        }, formGroup.controls);
    }
}
