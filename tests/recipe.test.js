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

describe('GET /recipes', () => {
  it('should return 200 and an array of recipes', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return recipes with expected fields', async () => {
    const res = await request(app).get('/recipes');
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('title');
      expect(res.body[0]).toHaveProperty('ingredients');
    }
  });
});

describe('GET /recipes/:id', () => {
  it('should return 200 and a single recipe for a valid id', async () => {
    const all = await request(app).get('/recipes');
    const existingId = all.body[0]._id;

    const res = await request(app).get(`/recipes/${existingId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', existingId);
  });

  it('should return 404 for a non-existent id', async () => {
    const res = await request(app).get('/recipes/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});