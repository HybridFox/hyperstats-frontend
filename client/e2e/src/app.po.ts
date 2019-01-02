import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHtml() {
    return element(by.css('app-root')).getText();
  }
}
