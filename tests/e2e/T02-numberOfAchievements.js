request = require("supertest");
server = request.agent("http://localhost:8080");

describe('There are achievements in the system', function () {
    it('Should show that there are three achievements in the achievements list', function () {
        browser.get('http://localhost:8080/#/achievements');
        var achievements = element.all(by.repeater("achievement in achievements"));
        expect(achievements.count()).toBe(3);
    });
});