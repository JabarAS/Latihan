const chai = require('chai')
const data = require('../../src/json_schema/user/detail_user.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('Detail user',() => {

        it('Success get detail of user', (done) => {
            let api = chai.request('https://reqres.in/api');
            api.get(`/users/${global.id_user}`)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body.data.id).to.equal(global.id_user);
                expect(res.body).to.be.jsonSchema(data.positive);
                done();
            })
        })

        it('Get detail user with id not found', (done) => {
            let api = chai.request('https://reqres.in/api');
            api.get(`/users/0`)
            .end(function(err, res){
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.be.jsonSchema(data.negative);
                done();
            })
        })
    })
}