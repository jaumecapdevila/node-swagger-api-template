const should = require('should');
const request = require('supertest');
const server = require('../../../server');
const config = require('../../../api/config/config');

// Remember to start the docker environment before running the tests
describe('POST /models', () => {
  it('should return a 201 resource created', (done) => {
    request(server)
      .post(`${config.prefix}/models`)
      .send({ propertyA: 'test', propertyB: 1 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        should.not.exist(err);
        done();
      });
  });
});
it('should return a 400 invalid request', (done) => {
  request(server)
    .post(`${config.prefix}/models`)
    .send({ propertyA: 1, propertyB: 'test' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      should.not.exist(err);
      done();
    });
});
