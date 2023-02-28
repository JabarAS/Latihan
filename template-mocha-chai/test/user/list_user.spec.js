const chai = require('chai')
const data = require('../../src/json_schema/user/list_user.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('Get list of users',() => {

        it('Success get list of users', (done) => {
            
            let api = chai.request('https://reqres.in/api');
            api.get('/users')
            .query('page', 1)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                global.id_user = res.body.data[0].id;
                done();
            })
        })
    })
}