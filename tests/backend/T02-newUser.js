var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Create a new user', function () {
    it('The request is correct, so we should get a 201 status', function () {
        request('http://localhost:8080')
            .post('/api/v1/users')
            .type('form')
            .send({
                fullName: 'testFullName', username: 'test', password: 'test', email: 'test@test.com',
                birthdate: '1990-01-01', height: 1.91, weight: 81.1
            })
            .set('Accept', /application\/json/)
            .end(function (err, res) {
                res.status.should.be.equal(201);
            });
    });
});