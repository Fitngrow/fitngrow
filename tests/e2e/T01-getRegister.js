var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Get the user register', function () {
    it('The user is registered, so we should get a 200 status', function () {
        var username = "test2";

        browser.get('http://localhost:8080/#/register');
        element(by.css('[id="fullname"]')).sendKeys("test2FullName");
        element(by.css('[id="username"]')).sendKeys(username);
        element(by.css('[id="password"]')).sendKeys(username);
        element(by.css('[id="email"]')).sendKeys("email2@email2.com");
        element(by.css('[id="birthdate"]')).sendKeys("02/02/1992");
        element(by.css('[id="height"]')).sendKeys("1.92");
        element(by.css('[id="weight"]')).sendKeys("82.2");
        element(by.css('[id="option-button"]')).click();

        // Añadido tiempo de espera para que el servidor pueda almacenar los datos del nuevo usuario

        sleep(5000)
            .then(() => {
                request('http://localhost:8080')
                    .get('/api/v1/users/service/existsUsername/' + username)
                    .send()
                    .end(function (err, res) {
                        res.status.should.be.equal(200);
                        res.body.status.should.be.equal(true);
                    });
            });
    });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}