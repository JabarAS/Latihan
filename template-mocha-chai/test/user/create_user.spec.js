const { faker } = require('@faker-js/faker');
const chai = require('chai')
const data = require('../../src/json_schema/user/create_user.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('Create user',() => {

        it('Success create user with full body', (done) => {
            const name = faker.name.findName();

            let api = chai.request('https://reqres.in/api');
            api.post(`/users`)
            .set("Content-type", "application/json")
            .send({
                name : name,
                job : faker.job
            })
            .end(function(err, res){
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.be.jsonSchema(data.full);
                expect(res.body.name).to.equal(name);
                done();
            })
        })

        it('Success create user with name only body', (done) => {
            const name = faker.name.findName();

            let api = chai.request('https://reqres.in/api');
            api.post(`/users`)
            .set("Content-type", "application/json")
            .send({
                name : name
            })
            .end(function(err, res){
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.be.jsonSchema(data.name_only);
                expect(res.body.name).to.equal(name);
                done();
            })
        })

        it('Success create user with job only body', (done) => {
            let api = chai.request('https://reqres.in/api');
            api.post(`/users`)
            .set("Content-type", "application/json")
            .send({
                job : faker.name.jobTitle()
            })
            .end(function(err, res){
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.be.jsonSchema(data.job_only);
                done();
            })
        })
    })

}