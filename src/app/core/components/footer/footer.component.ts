import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class Footercomponent {
  @Output() themeUpdate = new EventEmitter();

  public darkThemeEnabled = localStorage.getItem('darkThemeEnabled');

  constructor() { }

  toggleDarkTheme = () => {
    if (this.darkThemeEnabled === null) {
      this.darkThemeEnabled = "false";
    }

    if (this.darkThemeEnabled === "false") {
      this.darkThemeEnabled = "true";
    } else if (this.darkThemeEnabled === "true") {
      this.darkThemeEnabled = "false";
    }

    localStorage.setItem('darkThemeEnabled', this.darkThemeEnabled);
    this.themeUpdate.emit(this.darkThemeEnabled);
  }
}
