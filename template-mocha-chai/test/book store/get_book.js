const chai = require('chai')
const data = require('../../../src/json_schema/book_store/create_akun.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('get', () => {

        it('Success get detail of user', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.get(`/user/${global.id_user}`)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data.id).to.equal(global.id_user);
                    expect(res.body).to.be.jsonSchema(data.get);
                    done();
                })
        })

        it('Success get detail of user', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.get(`/user`)
                .set("Content-type", "application/json")
                .send({
                    user_id: 'test123'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data.id).to.equal(global.id_user);
                    expect(res.body).to.be.jsonSchema(data.get);
                    done();
                })
        })

        it('Get detail user with id not found', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.get(`/user/0`)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.be.jsonSchema(data.not_found);
                    done();
                })
        })
    })
}