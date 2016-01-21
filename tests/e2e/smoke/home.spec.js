describe('Smoke test home page', function(){
  it('title should contain Souqalmal Test', function(){
    browser.get('/');
    expect(browser.getTitle()).toMatch(/.*Souqalmal test.*/);
  });
});
