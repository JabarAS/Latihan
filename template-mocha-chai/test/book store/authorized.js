const { faker } = require('@faker-js/faker');
const chai = require('chai')
const data = require('../../src/json_schema/book_store/authorized.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('Authorized', () => {

        it('success to Authorized ', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/Authorized`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'test123',
                    password: 'JabarAS12#'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.jsonSchema(data.success);
                    done();
                })
        })

        it('not generate token', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/Authorized`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'jabar4141',
                    password: 'Malaria1#'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.jsonSchema(data.blm_generate);
                    done();
                })
        })

        it('invalid user account ', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/Authorized`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'test321',
                    password: 'fake1231@@'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.be.jsonSchema(data.fake_akun);
                    done();
                })
        })

        it('invalid username ', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/Authorized`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'test321',
                    password: 'JabarAS12#'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.be.jsonSchema(data.fake_akun);
                    done();
                })
        })

        it('invalid password', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/Authorized`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'test123',
                    password: 'JabarAS134$'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.be.jsonSchema(data.fake_akun);
                    done();
                })
        })

        it('blank password', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/Authorized`)
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
            api.post(`/Authorized`)
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