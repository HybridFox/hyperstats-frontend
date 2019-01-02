import { schema } from 'normalizr';

export const role = new schema.Entity('roles');

export const user = new schema.Entity('users', {
  roles: [role],
});
