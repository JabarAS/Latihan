const chai = require('chai')
const data = require('../../src/json_schema/book_store/get_book.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function() {

    describe('get user', () => {

        before('success generateToken', (done) => {
            //before ini digunain buat penanda ke testnya, bahwa ini dilakuin sebelum / before semua test di file itu jalan
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.post(`/GenerateToken`)
                .set("Content-type", "application/json")
                .send({
                    userName: 'dar3i', //kita udah punya data yang udah disiapin
                    password: 'Sadasdfgww1231!'
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    // kalau mau ada perpindahan value dari satu kebutuhan ke kebutuhan yg lain, pasti pake variabel
                    token = res.body.token;
                    done();
                })
        })
        
        it('Success get detail of user', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.get(`/User/cd1054ad-62f2-4b97-ba46-951e0ced3ab1`)
                .set("Content-type", "application/json")
                //kalau ada bearer gimana -> token tu bisa invalid semisal 1 jam doang
                // bikin logic yang memastikan bahwa token yang didapet itu selalu fresh / baru
                // kita dapet token dari api yang apa ..? --> generate token
                // value token itu disimpen di data yang mana --> di body yang punya key token
                // kita ambil value token itu dan dikasih ke Authorization --> assign ke Authorization
                //user id juga gimana -> udah nyiapin data sebelumnya
                .set({ "Authorization": `Bearer ${token}` })
                .end(function(err, res) {
                    console.log(res.body)
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.jsonSchema(data.get);
                    done();
                })
        })

        it('Get detail book with id not found', (done) => {
            let api = chai.request('https://bookstore.toolsqa.com/Account/v1');
            api.get(`/User/cd1054ad-62f2-4b97-ba46-951e0ced3ab12`)

            .set({ "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRhcjNpIiwicGFzc3dvcmQiOiJTYWRhc2RmZ3d3MTIzMSEiLCJpYXQiOjE2NzgxNTIyNTR9.HI9-QFql97mBQxyZ_Wppi_vfnvbqUX_KIg3SUDqmVJ0` })
                .end(function(err, res) {
                    console.log(res.body)
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.be.jsonSchema(data.not_found);
                    done();
                })
        })

        // after('Delete id user', function(done))
        // sesuai kebutuhan
    })
}