const chai = require('chai')
const data = require('../../src/json_schema/book_store/get_book.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('get', () => {

        it('Success get detail of user', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.get(`/User`)
                .set({ "Authorization": `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRhcjNpIiwicGFzc3dvcmQiOiJTYWRhc2RmZ3d3MTIzMSEiLCJpYXQiOjE2NzgxNTIyNTR9.HI9-QFql97mBQxyZ_Wppi_vfnvbqUX_KIg3SUDqmVJ0}` })
                .send({
                    userID: 'cd1054ad-62f2-4b97-ba46-951e0ced3ab1'
                })
                .end(function(err, res) {
                    console.log(res.body)
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.jsonSchema(data.get);
                    done();
                })
        })

        it('Get detail user with id not found', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.get(`/User`)
                .set("Content-type", "application/json")
                .set({ "Authorization": `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRhcjNpIiwicGFzc3dvcmQiOiJTYWRhc2RmZ3d3MTIzMSEiLCJpYXQiOjE2NzgxNTIyNTR9.HI9-QFql97mBQxyZ_Wppi_vfnvbqUX_KIg3SUDqmVJ0}` })
                .send({
                    userID: 'cd1054ad-62f2-4b97-ba46-951e0ced3ab12',
                })
                .end(function(err, res) {
                    console.log(res.body)
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.be.jsonSchema(data.not_found);
                    done();
                })
        })
    })
}