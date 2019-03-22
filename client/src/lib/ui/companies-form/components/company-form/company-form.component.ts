import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pathOr } from 'ramda';
import countryList from 'country-list';
import { Option } from '@ui/form-fields/components/select/select.types';
import { COMPANY_TYPE_OPTIONS } from './company-form.const';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
})
export class CompanyFormComponent implements OnChanges, OnInit {
    @Input() public company: any;
    @Input() public companies: Option[];
    @Input() public admin: boolean;

    @Output() public save: EventEmitter<any> = new EventEmitter<any>();
    @Output() public remove: EventEmitter<any> = new EventEmitter<any>();
    @Output() public toggleActivation: EventEmitter<any> = new EventEmitter<any>();

    public form: FormGroup;
    public countryList: Option[];
    public companyTypeOptions: Option[];

    constructor(
        private formBuilder: FormBuilder,
        private translateService: TranslateService,
    ) {}

    public ngOnInit() {
        this.countryList = countryList.getData().map(({ code, name }) => ({
            value: code,
            label: name,
        }));

        this.companyTypeOptions = COMPANY_TYPE_OPTIONS.map(({ label, value }: Option) => ({
            label: this.translateService.instant(label),
            value,
        }));
    }

    public ngOnChanges() {
        this.form = this.createForm(this.company);
        if (!this.admin) {
          this.form.disable();
        }
    }

    public saveCompany() {
        this.save.emit({
            ...this.company || {},
            data: {
                ...pathOr({}, ['data'], this.company),
                ...pathOr({}, ['data'], this.form.getRawValue()),
            },
            meta: {
                ...pathOr({}, ['meta'], this.company),
                ...pathOr({}, ['meta'], this.form.getRawValue()),
            }
        });
    }

    public removeCompany() {
        this.remove.emit(this.company._id);
    }

    public toggleActivationCompany() {
        this.toggleActivation.emit({
            id: pathOr(null, ['_id'], this.company),
            value: !pathOr(false, ['meta', 'activated'], this.company)
        });
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
            type: 'RP',
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
