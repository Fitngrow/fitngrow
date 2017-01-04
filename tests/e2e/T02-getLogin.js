var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Get the user login', function () {
    it('The user is logged in, so we should get a 200 status', function () {
        browser.get('http://localhost:8080/#/login');

        element(by.css('[id="username"]')).sendKeys("test1");
        element(by.css('[id="password"]')).sendKeys("test1");
        element(by.css('[id="option-button"]')).click();

        request('http://localhost:8080')
            .get('/api/v1/users/service/status')
            .send()
            .end(function (err, res) {
                res.status.should.be.equal(200);
            });
    });
});