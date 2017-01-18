var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Get a record using a wrong ID', function () {
    it('There is no record with such ID, so we should get a 404 status', function () {
        request('http://localhost:8080')
            .get('/api/v1/records/fakeid')
            .send()
            .end(function (err, res) {
                res.status.should.be.equal(404);
            });
    });
});