var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Create a new user', function () {
    it('The request is correct, so we should get a 201 status', function () {
        request('http://localhost:8080')
            .post('/api/v1/users')
            .send({
                fullName: 'test1FullName', username: 'test1', password: 'test1', email: 'test1@test1.com',
                birthdate: '01/01/1991', height: 1.91, weight: 81.1
            })
            .end(function (err, res) {
                res.status.should.be.equal(201);
            });
    });
});