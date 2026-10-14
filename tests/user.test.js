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

describe('GET /users', () => {
  it('should return 200 and an array of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return users with expected fields', async () => {
    const res = await request(app).get('/users');
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('email');
    }
  });
});

describe('GET /users/:id', () => {
  it('should return 200 and a single user for a valid id', async () => {
    const all = await request(app).get('/users');
    const existingId = all.body[0]._id;

    const res = await request(app).get(`/users/${existingId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', existingId);
  });

  it('should return 404 for a non-existent id', async () => {
    const res = await request(app).get('/users/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});