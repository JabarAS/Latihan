const { faker } = require('@faker-js/faker');
const chai = require('chai')
const data = require('../../src/json_schema/auth/register.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('Auth feature',() => {

        it('Success register user', (done) => {
            let api = chai.request('https://reqres.in/api');
            api.post(`/register`)
            .set("Content-type", "application/json")
            .send({
                email : 'eve.holt@reqres.in',
                password : 'pistol'
            })
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data.success);
                done();
            })
        })

        it('Failed register user undefined data', (done) => {
            let api = chai.request('https://reqres.in/api');
            api.post(`/register`)
            .set("Content-type", "application/json")
            .send({
                email : faker.internet.email(),
                password : 'Password123'
            })
            .end(function(err, res){
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.jsonSchema(data.undefined_user);
                done();
            })
        })

        it('Failed register user null email', (done) => {
            let api = chai.request('https://reqres.in/api');
            api.post(`/register`)
            .set("Content-type", "application/json")
            .send({
                password : 'Password123'
            })
            .end(function(err, res){
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.jsonSchema(data.missing_email);
                done();
            })
        })

        it('Failed register user null password', (done) => {
            let api = chai.request('https://reqres.in/api');
            api.post(`/register`)
            .set("Content-type", "application/json")
            .send({
                email : faker.internet.email()
            })
            .end(function(err, res){
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.jsonSchema(data.missing_pass);
                done();
            })
        })
    })
}