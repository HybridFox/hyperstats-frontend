import { EntitiesReducer} from './entities/entities.reducer';
import { AuthReducer } from './auth/auth.reducer';

export const reducers = {
  entities: EntitiesReducer,
  auth:  AuthReducer
};
