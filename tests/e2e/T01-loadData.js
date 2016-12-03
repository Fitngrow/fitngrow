describe('Some data is loaded',function(){
    it('Should show some data in the achievements list',function (){
        browser.get('http://localhost:8080/#/achievements');
        var achievements = element.all(by.repeater("achievement in achievements"));
        expect(achievements.count()).toBeGreaterThan(0);
    });
});