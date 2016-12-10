var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Get the achievements in the system', function () {
    it('There are six achievements in the system, so we should get a 200 status', function () {
        request('http://localhost:8080')
            .get('/api/v1/achievements')
            .send()
            .end(function (err, res) {
                res.status.should.be.equal(200);
            });
    });
});