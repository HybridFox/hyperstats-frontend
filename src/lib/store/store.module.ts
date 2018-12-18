import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';

import { environment } from '@environments/environment';
import { LocalstorageType } from '@core/localstorage';

import { Services } from '@store/services';
import { StoreService } from '@store/store.service';

import { LocalstorageModule, LocalstorageReduxPlugin } from '@core/localstorage';

@NgModule({
  imports: [
    NgReduxModule,
    LocalstorageModule.forRoot({
      identifier: 'rare-storage-v1',
      storageType: LocalstorageType.localStorage,
    }),
  ],
  providers: [
    StoreService,
    Services,
  ],
})
export class StoreModule {
  constructor(
    private ngRedux: NgRedux<any>,
    private devTools: DevToolsExtension,
    private localStorage: LocalstorageReduxPlugin,
    private storeService: StoreService,
  ) {
    const syncedSelectors = [
      'columns',
    ];
    const initialState = this.localStorage.selectFromStorage(syncedSelectors);
    const syncedReducerPlaceholders = syncedSelectors.reduce((acc, curr) => ({
      ...acc,
      [curr]: () => initialState.hasOwnProperty(curr) ? initialState[curr] : null,
    }), {});
    const rootReducer = this.storeService.createReducer({
      ...syncedReducerPlaceholders,
      ...this.storeService.asyncReducers,
    });

    // Note that starting from v2.7, window.devToolsExtension was renamed to
    // window.__REDUX_DEVTOOLS_EXTENSION__ / window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__.
    // temporary use `(window as any).__REDUX_DEVTOOLS_EXTENSION__()` instead of `this.devTools.enhancer()`
    // const enhancers = !environment.production && this.devTools.isEnabled() ? [this.devTools.enhancer()] : [];
    const enhancers = !environment.production && this.devTools.isEnabled() ? [(window as any).__REDUX_DEVTOOLS_EXTENSION__()] : [];

    // TODO: figure out how to do this with lazyLoaded modules
    this.localStorage.subscribe(syncedSelectors);

    this.ngRedux.configureStore(rootReducer, initialState, [], enhancers);
  }
}
