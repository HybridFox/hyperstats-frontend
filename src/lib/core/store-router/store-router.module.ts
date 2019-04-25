import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';

import { Services } from '@store/services';
import { StoreService } from '@store/store.service';
import { Router, ActivationStart, NavigationEnd } from '@angular/router';
import { StoreRouterActions } from './store/actions';

@NgModule({
  imports: [
    NgReduxModule
  ],
  providers: [
    StoreService,
    Services,
    StoreRouterActions
  ],
})
export class StoreRouterModule {
    constructor(
        private router: Router,
        private storeRouterActions: StoreRouterActions
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof ActivationStart) {
                this.storeRouterActions.dataChanged(event.snapshot.data);
            }

            if (event instanceof NavigationEnd) {
                this.storeRouterActions.urlChanged(event.url);
            }
        });
    }
}
