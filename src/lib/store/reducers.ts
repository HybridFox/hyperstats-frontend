import { EntitiesReducer} from './entities/entities.reducer';
import { routerReducer } from '@core/store-router/store/reducer';

export const reducers = {
  entities: EntitiesReducer,
  router: routerReducer
};
