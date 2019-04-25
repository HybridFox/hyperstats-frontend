import { Subject } from 'rxjs';
import { timer } from 'rxjs';
import { map, distinctUntilChanged, delay } from 'rxjs/operators';

export class LoadingHandler {
  static STATUS = {
    SHORT: 'SHORT',
    MIDDLE: 'MIDDLE',
    LONG: 'LONG',
  };

  private isLoading$ = new Subject();
  private timer$;

  public isLoading(): Subject<any> {
    return this.isLoading$;
  }

  public startLoading(setDelay = 600) {
    this.timer$ = timer(0, 1000)
      .pipe(
        delay(setDelay), // Faster than 0,6 second --> do nothing
        map((i) => {
          // Faster than 10 seconds --> show short loading state
          if (i < 10) {
            return LoadingHandler.STATUS.SHORT;
          }

          // Longer than 10 seconds and faster than 20 seconds --> show short loading state
          if (i < 20) {
            return LoadingHandler.STATUS.MIDDLE;
          }

          // Longer than 20 seconds --> show long loading state
          return LoadingHandler.STATUS.LONG;
        }),
        distinctUntilChanged(),
      )
      .subscribe((o) => {
        this.isLoading$.next(o);
      });
  }

  public stopLoading() {
    // Prevent flickering --> show loading icon at least 1 second
    setTimeout(() => {
      this.isLoading$.next(null);
    }, 1000);
  }

  public clearLoader() {
    if (this.timer$) {
      this.timer$.unsubscribe();
    }
  }
}
