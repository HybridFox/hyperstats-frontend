import {
  Component,
  OnDestroy,
  HostBinding,
  HostListener,
  ApplicationRef
} from '@angular/core';
import {
  trigger,
  state,
  transition,
  animate,
  style
} from '@angular/animations';
import { SafeHtml } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { ToastrService, IndividualConfig, ToastPackage } from 'ngx-toastr';

@Component({
  selector: '[toast-component]', // tslint:disable-line
  templateUrl: './translate-toast.component.html',
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          display: 'none',
          opacity: 0
        })
      ),
      state('active', style({ opacity: 1 })),
      state('removed', style({ opacity: 0 })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => removed', animate('300ms ease-in'))
    ])
  ]
})
export class TranslateToastComponent implements OnDestroy {
  message?: string | SafeHtml | null;
  title?: string;
  options: IndividualConfig;
  width = -1;

  @HostBinding('class') toastClasses = '';
  @HostBinding('@flyInOut') state = 'inactive';

  private timeout: any;
  private intervalId: any;
  private hideTime: number;
  private sub: Subscription;
  private sub1: Subscription;

  constructor(
    private toastrService: ToastrService,
    private toastPackage: ToastPackage,
    private appRef: ApplicationRef
  ) {
    this.message = toastPackage.message;
    this.title = toastPackage.title;
    this.options = toastPackage.config;
    this.toastClasses = `${toastPackage.toastType} ${
      toastPackage.config.toastClass
    }`;
    this.sub = toastPackage.toastRef.afterActivate().subscribe(() => {
      this.activateToast();
    });
    this.sub1 = toastPackage.toastRef.manualClosed().subscribe(() => {
      this.remove();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    clearInterval(this.intervalId);
    clearTimeout(this.timeout);
  }

  activateToast() {
    this.state = 'active';
    if (this.options.timeOut) {
      this.timeout = setTimeout(() => {
        this.remove();
      }, this.options.timeOut);
      this.hideTime = new Date().getTime() + this.options.timeOut;
      if (this.options.progressBar) {
        this.intervalId = setInterval(() => this.updateProgress(), 10);
      }
    }
    if (this.options.onActivateTick) {
      this.appRef.tick();
    }
  }

  updateProgress() {
    if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
      return;
    }
    const now = new Date().getTime();
    const remaining = this.hideTime - now;
    this.width = (remaining / this.options.timeOut) * 100;
    if (this.options.progressAnimation === 'increasing') {
      this.width = 100 - this.width;
    }
    if (this.width <= 0) {
      this.width = 0;
    }
    if (this.width >= 100) {
      this.width = 100;
    }
  }

  remove() {
    if (this.state === 'removed') {
      return;
    }
    clearTimeout(this.timeout);
    this.state = 'removed';
    this.timeout = setTimeout(
      () => this.toastrService.remove(this.toastPackage.toastId),
      300
    );
  }

  @HostListener('click')
  tapToast() {
    if (this.state === 'removed') {
      return;
    }
    this.toastPackage.triggerTap();
    if (this.options.tapToDismiss) {
      this.remove();
    }
  }

  @HostListener('mouseenter')
  stickAround() {
    if (this.state === 'removed') {
      return;
    }
    clearTimeout(this.timeout);
    this.options.timeOut = 0;
    this.hideTime = 0;

    // disable progressBar
    clearInterval(this.intervalId);
    this.width = 0;
  }

  @HostListener('mouseleave')
  delayedHideToast() {
    if (this.options.extendedTimeOut === 0 || this.state === 'removed') {
      return;
    }
    this.timeout = setTimeout(
      () => this.remove(),
      this.options.extendedTimeOut
    );
    this.options.timeOut = this.options.extendedTimeOut;
    this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
    this.width = 100;
    if (this.options.progressBar) {
      this.intervalId = setInterval(() => this.updateProgress(), 10);
    }
  }
}