import { schema } from 'normalizr';

export const role = new schema.Entity('roles');
export const recyclingProcess = new schema.Entity('recyclingProcesses', {}, { idAttribute: '_id' });
export const recyclingPartner = new schema.Entity('recyclingPartners', {}, { idAttribute: '_id' });

export const user = new schema.Entity('users', {
  roles: [role],
}, { idAttribute: '_id' });
