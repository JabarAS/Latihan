const { faker } = require('@faker-js/faker');
const chai = require('chai')
const data = require('../../src/json_schema/auth/register.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('Create Account', () => {

        it('success user input username dan format password ', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1/User');
            api.post(`/user`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'string',
                    password: 'Password1#'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.jsonSchema(data.success);
                    done();
                })
        })

        it('input invalid password', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1/User');
            api.post(`/user`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'string',
                    password: faker.password
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.be.jsonSchema(data.invalid_password);
                    done();
                })
        })

        it('blank username', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1/User');
            api.post(`/user`)
                .set("Content-type", "application/json")
                .send({
                    password: 'Password1#'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.be.jsonSchema(data.missing_username);
                    done();
                })
        })

        it('blank password', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1/User');
            api.post(`/user`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'string'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.be.jsonSchema(data.missing_password);
                    done();
                })
        })
    })
}