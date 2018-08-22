import { WeatherGitPage } from './app.po';

describe('weather-git App', () => {
  let page: WeatherGitPage;

  beforeEach(() => {
    page = new WeatherGitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
