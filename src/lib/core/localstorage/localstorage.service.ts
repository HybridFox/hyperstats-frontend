import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { LOCALSTORAGE_CONFIG } from './localstorage.conf';
import { LocalstorageConfig, Comparator, Selector, PathSelector } from './localstorage.types';
import { MemoryStorage } from './polyfill';
import { Utils } from './utils';

@Injectable()
export class LocalstorageService {
  public static instance: LocalstorageService;

  public get instance(): LocalstorageService {
    return LocalstorageService.instance;
  }

  public set instance(instance: LocalstorageService) {
    if (LocalstorageService.instance) {
      return;
    }

    LocalstorageService.instance = instance;
  }

  public get snapshot(): any {
    return this._snapshot;
  }

  public storageType: string;
  public identifier: string;

  private _snapshot: any;
  private storage: Storage;
  private subscribers: Map<Selector, BehaviorSubject<any>> = new Map<Selector, BehaviorSubject<any>>();

  constructor(
    @Inject(LOCALSTORAGE_CONFIG) private localstorageConfig,
  ) {
    this.instance = this;

    this.setStorage(this.localstorageConfig);
    this.updateSnapshot();
    this.validateStorage();
  }

  public setStorage({
    storageType,
    identifier = '',
  }: LocalstorageConfig = {}): void {
    this.storageType = Utils.verifyStorageType(storageType, 'localStorage');
    this.storage = this.storageType === 'memory' ? new MemoryStorage() : window[this.storageType];

    this.identifier = identifier;
  }

  /**
     * Browser Storage api
     */
  public setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
    this.updateStorage(key);
  }

  public getItem<T = any>(key: string): T {
    return Utils.parseJSON(key, this.storage.getItem(key));
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
    this.updateStorage(key);
  }

  public clear(...args): void {
    this.storage.clear.apply(this.storage, args);
    this.updateStorage();
  }

  /**
   * Decorator api
   */
  public select<T = any>(selector: Selector, comparator: Comparator = Utils.comparator): BehaviorSubject<T> {
    // if the selector is an array, add a subscription for the last item
    if (Array.isArray(selector)) {
      return (this.getChildSubscription(selector, this.select(selector[0]))
        .pipe(
          distinctUntilChanged(comparator),
        ) as any) as BehaviorSubject<T>; // make sure it is only triggered when the value changes
    }

    return (this.addSubscriber<T>(selector)
      .pipe(
        distinctUntilChanged<T>(comparator),
      ) as any) as BehaviorSubject<T>;
  }

  public clearSubscribers(): void {
    this.subscribers.forEach(subscriber => {
      subscriber.unsubscribe();
    });
  }

  // TODO: more selective clear so auth tokens are not cleared
  private validateStorage(): void {
    const storage = this.snapshot;

    if (!this.identifier && !storage['cas-storage']) {
      return;
    }

    if (this.identifier && !storage['cas-storage']) {
      return this.setItem('cas-storage', this.identifier);
    }

    if (this.identifier && this.identifier !== storage['cas-storage']) {
      return this.clear();
    }
  }

  private addSubscriber<T = any>(selector: Selector): BehaviorSubject<T> {
    if (!this.subscribers.has(selector)) {
      this.subscribers.set(selector, new BehaviorSubject<T>(Utils.select(this.snapshot, selector)));
    }

    return this.subscribers.get(selector);
  }

  private getChildSubscription<T = any>(selector: PathSelector, parentSubscription: BehaviorSubject<any>): BehaviorSubject<T> {
    const subscriber = this.addSubscriber<T>(selector);

    parentSubscription
      .pipe(
        map((nextValue => {
          return Utils.verifyPath(nextValue, selector.slice(1)); // filter out the selected path value
        }).bind(this)),
      )
      .subscribe((nextValue: T) => {
        subscriber.next(nextValue);
      });

    return subscriber;
  }

  private updateSubscribers(key?: string): void {
    const storage = this.snapshot;

    this.subscribers.forEach((subscriber: BehaviorSubject<any>, selector: Selector) => {
      if (key !== undefined && !Utils.keyMatches(key, selector)) {
        return;
      }

      subscriber.next(Utils.select(storage, selector));
    });
  }

  private updateSnapshot(): void {
    this._snapshot = {
      ...Object.keys(this.storage).reduce((acc, prop) => {
        acc[prop] = Utils.parseJSON(prop, this.storage[prop]);
        return acc;
      }, {}),
    };
  }

  private updateStorage(key?: string): void {
    this.updateSubscribers(key);
    this.updateSnapshot();
  }
}
