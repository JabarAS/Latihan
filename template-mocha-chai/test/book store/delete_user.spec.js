const chai = require('chai')
const data = require('../../src/json_schema/book_store/delete_book.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
const { faker } = require('@faker-js/faker');

module.exports = function() {

    describe('delete user', () => {
        
        // dia butuh userId --> create_account
        // dia butuh token --> generate_token
        // aplikasiin before ke sini

        before('success create account', (done) => {
            //dia harus digenerate dan disimpen sebelum ngelakuin request
            username = faker.name.firstName()

            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/user`)
                .set("Content-type", "application/json")
                .send({
                    userName: username,// value variabel yang isinya hasil dari generate faker
                    password: 'JabarAS12#'
                })
                .end(function(err, res) {
                    console.log(res.body)
                    expect(res.statusCode).to.equal(201);
                    global.userID = res.body.userID
                    done();
                })
        })

        // 1. pake faker
        // 2. generate token ga pake faker
        // masalahnya di data username yang disend, data yang dikirim engga sama
        // gimana caranya biar sama, variabel -> yang bakal nyimpen data2 yang bakal kita pindah2

        before('success generateToken', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/GenerateToken`)
                .set("Content-type", "application/json")
                .send({
                    userName: username, //pake value username yang tadi udah dibuat
                    password: 'JabarAS12#'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    token = res.body.token
                    done();
                })
        })

        it('Delete user with valid id', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.delete(`/user/${global.userID}`)
                .set('Authorization', `Bearer ${token}`)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(204);
                    done();
                })
        })

        it('Delete user with id not found', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.delete(`/user/0`)
                .set('Authorization', `Bearer ${token}`)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.jsonSchema(data.not_found);
                    done();
                })
        })
    })
}