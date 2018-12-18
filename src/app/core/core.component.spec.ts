import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';


import { CoreComponent } from './core.component';

class MockAuthService {}

class MockNotificationsService {
  listen() {
    return new Subject<any>();
  }
}

class MockTrackjsService {
  public setRootViewContainerRef (ref) {}
}

class MockLanguageService {

}

describe('CoreComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreComponent ],
      imports: [
        RouterTestingModule,
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(CoreComponent);
    expect(fixture).not.toBeNull();
  }));
});
