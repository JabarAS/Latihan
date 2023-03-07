const { faker } = require('@faker-js/faker');
const chai = require('chai')
const data = require('../../src/json_schema/book_store/generate_token.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('GenerateToken', () => {

        it('success generateToken', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/GenerateToken`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'test123', //kita udah punya data yang udah disiapin
                    password: 'JabarAS12#'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.jsonSchema(data.token);
                    done();
                })
        })

        it('invalid user account ', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/GenerateToken`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'sepinih',
                    password: 'Kenapa1@sepi'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.jsonSchema(data.fake_akun);
                    done();
                })
        })

        it('invalid username ', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/GenerateToken`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'test321',
                    password: 'JabarAS12#'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.jsonSchema(data.fake_akun);
                    done();
                })
        })

        it('invalid password', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/GenerateToken`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'test123',
                    password: 'JabarAS12'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.jsonSchema(data.fake_akun);
                    done();
                })
        })

        it('blank password', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/GenerateToken`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'test123',
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.be.jsonSchema(data.missing_data);
                    done();
                })
        })

        it('blank username', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/GenerateToken`)
                .set("Content-type", "application/json")
                .send({
                    password: 'JabarAS12#'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.be.jsonSchema(data.missing_data);
                    done();
                })
        })
    })
}