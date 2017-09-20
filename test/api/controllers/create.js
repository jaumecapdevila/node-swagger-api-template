const should = require('should');
const request = require('supertest');
const server = require('../../../server');

describe('controllers', () => {
  describe('create', () => {
    describe('POST /models', () => {
      it('should return a 201 resource created', (done) => {
        request(server)
          .post('/models')
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
  });
});
