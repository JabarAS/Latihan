const chai = require('chai')
const data = require('../../src/json_schema/book_store/delete_book.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('delete user', () => {

        it('Delete get detail of user', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.delete(`/user/${global.userID}`)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(204);
                    done();
                })
        })

        it('Delete user with id not found', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.delete(`/user/0`)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.be.jsonSchema(data.not_found);
                    done();
                })
        })
    })
}