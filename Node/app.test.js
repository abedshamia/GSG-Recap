/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('./app');

test('should return 200 status code on / ', done => {
  supertest(app).get('/').expect(200, done);
});

test('should return json on /students', done => {
  supertest(app).get('/students').expect('Content-Type', /json/).expect(200, done);
});

test('should return 404 status code on /?', done => {
  supertest(app).get('/?').expect(404, done);
});

const jsonUser = JSON.stringify({
  name: 'John',
  age: 20,
});
test('Should return the added data on /students', done => {
  supertest(app)
    .post('/students')
    .send(jsonUser)
    .end((err, res) => {
      if (err) {
        console.log(err);
      } else {
        expect(res.status).toBe(201);
        expect(res.text).toBe('Hello John');
        done();
      }
    });
});
