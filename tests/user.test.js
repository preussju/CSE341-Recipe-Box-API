const request = require('supertest');
const mongodb = require('../data/database');

let app;

beforeAll((done) => {
    mongodb.initDb((err) => {
        if (err) {
            console.log(err);
            done(err);
        } else {
            app = require('../server');
            done();
        }
    });
});

describe('GET /user', () => {
  it('should return 200 and an array of users', async () => {
    const res = await request(app).get('/user');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return users with expected fields', async () => {
    const res = await request(app).get('/user');
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('email');
    }
  });
});

describe('GET /user/:id', () => {
  it('should return 200 and a single user for a valid id', async () => {
    const all = await request(app).get('/user');
    const existingId = all.body[0]._id;

    const res = await