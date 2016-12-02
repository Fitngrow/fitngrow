var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Get of an unexisting data', function(){
    it('should get a 404 status', function(){
        request('http://localhost:8080')
        .get('/api/v1/records/xxxxxxxxxx')
        .send()
        .end(function(err,res){
            res.status.should.be.equal(404);
        });
    });
});