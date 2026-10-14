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

describe('GET /ratings', () => {
  it('should return 200 and an array of ratings', async () => {
    const res = await request(app).get('/ratings');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return ratings with expected fields', async () => {
    const res = await request(app).get('/ratings');
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('score');
      expect(res.body[0]).toHaveProperty('comment');
    }
  });
});

describe('GET /ratings/:id', () => {
  it('should return 200 and a single rating for a valid id', async () => {
    const all = await request(app).get('/ratings');
    const existingId = all.body[0]._id;

    const res = await request(app).get(`/ratings/${existingId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', existingId);
  });

  it('should return 404 for a non-existent id', async () => {
    const res = await request(app).get('/ratings/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});