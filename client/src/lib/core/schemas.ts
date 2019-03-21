import { schema } from 'normalizr';

export const role = new schema.Entity('roles');
export const recyclingProcess = new schema.Entity('recyclingProcesses', {}, { idAttribute: '_id' });
export const recyclingPartner = new schema.Entity('recyclingPartners', {}, { idAttribute: '_id' });
export const report = new schema.Entity('reports', {}, { idAttribute: '_id' });
export const proxy = new schema.Entity('proxies', {}, { idAttribute: '_id' });

export const company = new schema.Entity('companies', {}, { idAttribute: '_id' });
export const user = new schema.Entity('users', {
  roles: [role],
}, { idAttribute: '_id' });
