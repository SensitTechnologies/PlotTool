import { DevPlotPage } from './app.po';

describe('dev-plot App', () => {
  let page: DevPlotPage;

  beforeEach(() => {
    page = new DevPlotPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
