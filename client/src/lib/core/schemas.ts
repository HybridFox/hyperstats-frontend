import { schema } from 'normalizr';

const role = new schema.Entity('roles');

export const user = new schema.Entity('users', {
  roles: [role],
});
