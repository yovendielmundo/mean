describe('Smoke test home page', function(){

  beforeEach(function() {
    browser.get('/');
  });

  it('title should contain Souqalmal Test', function(){
    expect(browser.getTitle()).toMatch(/.*MEAN.*/);
  });

  it('should have an empty list of items in the menu', function() {
    var menuNameItem = element.all(by.repeater('item in hdrctr.menus.main'));

    expect(menuNameItem.count()).toBe(0);
  });

  it('should render login page', function() {
    var loginLink = element(by.model('auth.login'));
    loginLink.click();
    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toEqual('/auth/login');
    });
  });

  it('should login correctly and have a list of items in the menu', function() {

    browser.get('/auth/login');

    element(by.model('login.user.email')).sendKeys('test@test.com');
    element(by.model('login.user.password')).sendKeys('12345678');
    element(by.css('.submit_button')).click();

    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toEqual('/');

      var menuNameItem = element.all(by.repeater('item in hdrctr.menus.main'));
      expect(menuNameItem.count()).toBe(2);

    });

  });

});

