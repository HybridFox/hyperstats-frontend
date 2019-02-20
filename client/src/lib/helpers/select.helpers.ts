import { map, filter } from 'rxjs/operators';

export const companiesToSelectOptions = (obs$) => {
    return obs$
        .pipe(
            filter((companies: any[]) => {
                return Array.isArray(companies);
            }),
            map((companies: any[]) => {
                return companies.reduce((acc, company) => {
                    if (!company) {
                        return acc;
                    }

                    return acc.concat({
                        value: company._id,
                        label: company.data.name
                    });
                }, []);
            })
        );
};
