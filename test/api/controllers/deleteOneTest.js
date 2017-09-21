const should = require('should');
const request = require('supertest');
const server = require('../../../server');
const config = require('../../../api/config/config');
const uuidv4 = require('uuid/v4');

const generatedUuid = uuidv4();
// Remember to start the docker environment before running the tests
describe('DELETE /models/{uuid}', () => {
  it('should return a 201 resource created', (done) => {
    request(server)
      .post(`${config.prefix}/models`)
      .send({ uuid: generatedUuid, propertyA: 'test', propertyB: 1 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        should.not.exist(err);
        done();
      });
  });
  it('should return a 204', (done) => {
    request(server)
      .delete(`${config.prefix}/models/${generatedUuid}`)
      .set('Accept', 'application/json')
      .expect(204)
      .end((err, res) => {
        res.status.should.equal(204);
        should.not.exist(err);
        done();
      });
  });
  it('should return a 404 not found', (done) => {
    request(server)
      .get(`${config.prefix}/models/10`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        should.not.exist(err);
        done();
      });
  });
});
