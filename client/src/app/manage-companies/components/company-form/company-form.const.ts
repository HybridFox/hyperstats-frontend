import { Option } from '@ui/form-fields/components/select/select.types';
import { CompanyType } from '@api/company';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

export const COMPANY_TYPE_OPTIONS: Option[] = [{
    label: ngxExtract('Recycler') as string,
    value: CompanyType.R
}, {
    label: ngxExtract('Compliance Organisation') as string,
    value: CompanyType.CO
}, {
    label: ngxExtract('Authorisation Organisation') as string,
    value: CompanyType.AO
}];
