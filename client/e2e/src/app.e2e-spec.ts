import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show it works!', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('It works!');
  });
});
