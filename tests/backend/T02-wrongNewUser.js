var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Create a new user without attributes', function () {
    it('The new user does not have any attributes, so we should get a 405 status', function () {
        request('http://localhost:8080')
            .post('/api/v1/users/post')
            .send()
            .end(function (err, res) {
                res.status.should.be.equal(405);
            });
    });
});