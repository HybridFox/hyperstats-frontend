import { map, filter } from 'rxjs/operators';

export const recyclingPartners = (obs$) => {
    return obs$
        .pipe(
            filter((partners: any[]) => {
                return Array.isArray(partners);
            }),
            map((partners: any[]) => {
                return partners.map((partner) => {
                    return {'link': partner._id, 'label': partner.data.name};
                });
            })
        )
}
