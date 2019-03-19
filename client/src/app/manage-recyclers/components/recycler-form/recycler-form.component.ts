import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pathOr } from 'ramda';
import countryList from 'country-list';
import { Option } from '@ui/form-fields/components/select/select.types';

@Component({
    selector: 'app-recycler-form',
    templateUrl: './recycler-form.component.html',
})
export class RecyclerFormComponent implements OnInit, OnChanges {
    @Input() public recycler: any;

    public form: FormGroup;
    public countryList: Option[];

    constructor(
        private formBuilder: FormBuilder,
    ) {}

    public ngOnInit() {
      if (this.recycler) {
        this.form = this.createForm(this.recycler);
        this.form.disable();
      }
    }

    public ngOnChanges() {
      if (this.recycler) {
        this.form = this.createForm(this.recycler);
        this.form.disable();
      }
    }

    private createForm(value = {
        data: {
            name: '',
            vat: '',
            address: {
                street: '',
                number: '',
                box: '',
                zipCode: '',
                city: '',
                country: ''
            },
            contactPerson: {
                name: '',
                function: '',
                phone: '',
                mobile: '',
                email: ''
            }
        },
        meta: {
            activated: false,
            type: 'R',
            managedBy: null
        }
    }) {
        return this.formBuilder.group({
            data: this.formBuilder.group({
                name: [pathOr('', ['data', 'name'], value), Validators.required],
                vat: [pathOr('', ['data', 'vat'], value), Validators.required],
                address: this.formBuilder.group({
                    street: [pathOr('', ['data', 'address', 'street'], value), Validators.required],
                    number: [pathOr('', ['data', 'address', 'number'], value), Validators.required],
                    box: [pathOr('', ['data', 'address', 'box'], value)],
                    zipCode: [pathOr('', ['data', 'address', 'zipCode'], value), Validators.required],
                    city: [pathOr('', ['data', 'address', 'city'], value), Validators.required],
                    country: [pathOr('', ['data', 'address', 'country'], value), Validators.required],
                }),
                contactPerson: this.formBuilder.group({
                    name: [pathOr('', ['data', 'contactPerson', 'name'], value), Validators.required],
                    function: [pathOr('', ['data', 'contactPerson', 'function'], value), Validators.required],
                    phone: [pathOr('', ['data', 'contactPerson', 'phone'], value), Validators.required],
                    mobile: [pathOr('', ['data', 'contactPerson', 'mobile'], value), Validators.required],
                    email: [pathOr('', ['data', 'contactPerson', 'email'], value), [Validators.email, Validators.required]],
                })
            }),
            meta: this.formBuilder.group({
                activated: [pathOr(false, ['meta', 'activated'], value)],
                type: [pathOr('', ['meta', 'type'], value), Validators.required],
                managedBy: [pathOr(null, ['meta', 'managedBy'], value)]
            })
        });
    }
}
