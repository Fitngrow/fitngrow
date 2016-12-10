request = require("supertest");
server = request.agent("http://localhost:8080");

describe('Unachieved achievements in the achievements list', function () {
    it('Should show that there are three achievements in the unachieved achievements list', function () {
        browser.get('http://localhost:8080/#/achievements');
        var achievements = element.all(by.repeater("achievement in unachieved_achievements"));
        expect(achievements.count()).toBe(3);
    });
});