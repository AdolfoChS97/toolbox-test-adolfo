const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');
const should = chai.should();
const fileService = require('../service/files.service');

chai.use(chaiHttp);

describe('Files Service', () => {
    describe('GET /files/data', () => {
        it('Should get all the file names in the server', (done) => {
            chai.request(app)
                .get('/files/data')
                .set('authorization', ` Bearer aSuperSecretKey`)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        }).timeout(10000);
    });

    describe('GET /files/data with query params', () => {
        it('Should get one file name from the server', (done) => {
            chai.request(app)
                .get('/files/data?fileName=test1.csv')
                .set('authorization', ` Bearer aSuperSecretKey`)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.be.length(1);
                    done();
                });
                
        }).timeout(10000);
    });

    after((done) => {
        done();
        process.exit(1);
    });
});