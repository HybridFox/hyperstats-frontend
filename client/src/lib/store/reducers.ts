import { EntitiesReducer} from './entities/entities.reducer';
import { AuthReducer } from './auth/auth.reducer';
import { routerReducer } from '@core/store-router/store/reducer';

export const reducers = {
  entities: EntitiesReducer,
  auth:  AuthReducer,
  router: routerReducer
};
