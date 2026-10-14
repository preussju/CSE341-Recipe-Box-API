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

describe('GET /categories', () => {
  it('should return 200 and an array of categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return categories with expected fields', async () => {
    const res = await request(app).get('/categories');
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('description');
    }
  });
});

describe('GET /categories/:id', () => {
  it('should return 200 and a single category for a valid id', async () => {
    const all = await request(app).get('/categories');
    const existingId = all.body[0]._id;

    const res = await request(app).get(`/categories/${existingId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', existingId);
  });

  it('should return 404 for a non-existent id', async () => {
    const res = await request(app).get('/categories/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});