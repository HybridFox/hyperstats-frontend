import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be defined', () => {
    page.navigateTo();
    expect(page).toBeDefined();
  });
});
