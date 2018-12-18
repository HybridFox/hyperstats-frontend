import { schema } from 'normalizr';

const role = new schema.Entity('roles');
export const report = new schema.Entity('reports', {
  roles: [role],
});
