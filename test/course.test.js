import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
chai.should();
chai.use(chaiHttp);
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJtdWttYWZvcm9AZ21haWwuY29tIiwiaWF0IjoxNTk5OTk2NzMyLCJleHAiOjE2MDAwODMxMzJ9.KPrLj-2sM2HK-zReg1wV448qbBJ8iqiSDXmKmyElM0Y";
let courseId;

describe('POST /api/courses', () => {
    it('should POST a new course', (done) => {
        const course = {
            name: "Image processing",
            content: "COMPUTER SCIENCE: <=>This is the content of this course",
            genre: "COMPUTER SCIENCE and Telecom"

        };
        chai.request(app)
            .post('/api/courses')
            .set('x-auth-token', token)
            .send(course)
            .end((error, response) => {
                response.should.have.status(201);
                response.should.be.an('object');
                courseId = response.body.id;
                done();
            });

    });
    it('should return ONE Course', (done) => {
        chai.request(app)
            .get(`/api/courses/${courseId}`)
            //.set('auth-token', adminToken)

        .end((error, response) => {
            response.should.have.status(200);
            response.should.be.an('object');
            done();
        });

    });
    it('should NOT POST a new course', (done) => {
        const course = {
            name: "", //vALIDATION ISSUE
            content: "COMPUTER SCIENCE: <=>This is the content of this course",
            genre: "COMPUTER SCIENCE and Telecom"

        };
        chai.request(app)
            .post('/api/courses')
            .set('x-auth-token', token)
            .send(course)
            .end((error, response) => {
                response.should.have.status(400);
                response.should.be.an('object');
                done();
            });

    });
    it('should NOT POST a new course due to Authentication issue', (done) => {
        const course = {
            name: "Image processing",
            content: "COMPUTER SCIENCE: <=>This is the content of this course",
            genre: "COMPUTER SCIENCE and Telecom"

        };
        chai.request(app)
            .post('/api/courses')
            //.set('x-auth-token', token)
            .send(course)
            .end((error, response) => {
                response.should.have.status(401);
                response.should.be.an('object');
                done();
            });

    });
    it('should return all Courses', (done) => {
        chai.request(app)
            .get('/api/courses')
            //.set('auth-token', adminToken)

        .end((error, response) => {
            response.should.have.status(200);
            response.should.be.an('object');
            done();
        });

    });
    it('should NOT return all Courses', (done) => {
        chai.request(app)
            .get('/api/c') //wrong path
            //.set('auth-token', adminToken)
            .end((error, response) => {
                response.should.have.status(404);
                // response.should.be.an('object');
                done();
            });

    });

    it('should NOT RETURN ONE Course', (done) => {
        chai.request(app)
            .get('/api/co' + courseId) //WRONG PATH
            //.set('auth-token', adminToken)
            .end((error, response) => {
                response.should.have.status(404);
                // response.should.be.an('object');
                done();
            });

    });
})