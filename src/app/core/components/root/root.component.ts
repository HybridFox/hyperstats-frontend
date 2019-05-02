import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
})
export class RootComponent {
  public darkThemeEnabled = localStorage.getItem('darkThemeEnabled');

  constructor(
    private router: Router,
  ) { }

  public handleThemeUpdate(darkThemeEnabled: string) {
    this.darkThemeEnabled = darkThemeEnabled;
  }
}
