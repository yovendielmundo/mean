describe('Smoke test home page', function(){

  beforeEach(function() {
    browser.get('/');
  });

  it('title should contain Souqalmal Test', function(){
    expect(browser.getTitle()).toMatch(/.*Souqalmal test.*/);
  });

  it('should have a list of titles in the menu', function() {
    var menuNameItem = element.all(by.repeater('item in hdrctr.menus.testThemeMain').column('item.title'));

    function getNames() {
      return menuNameItem.map(function(elm) {
        return elm.getText();
      });
    }

    expect(menuNameItem.count()).toBe(1);

    expect(getNames()).toEqual([
      'Page one'
    ]);

  });

});
