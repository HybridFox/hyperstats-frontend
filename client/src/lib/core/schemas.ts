import { schema } from 'normalizr';

export const role = new schema.Entity('roles');
export const recyclingProcess = new schema.Entity('recyclingProcesses');

export const user = new schema.Entity('users', {
  roles: [role],
}, { idAttribute: '_id' });
