describe('Smoke test home page', function(){

  beforeEach(function() {
    browser.get('/');
  });

  it('title should contain Souqalmal Test', function(){
    expect(browser.getTitle()).toMatch(/.*MEAN.*/);
  });

  it('should have an empty list of items in the menu', function() {
    var menuNameItem = element.all(by.repeater('item in hdrctr.menus.testThemeMain'));

    expect(menuNameItem.count()).toBe(0);
  });

});
