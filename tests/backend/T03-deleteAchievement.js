var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Delete an achievement', function () {
    it('The id of the last achievement is 6, so we should get a 200 status and the achievement should be deleted', function () {
        request('http://localhost:8080')
            .delete('/api/v1/achievements/6')
            .send()
            .end(function (err, res) {
                res.status.should.be.equal(200);
            });
    });
});