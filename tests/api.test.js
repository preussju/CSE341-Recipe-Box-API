
jest.mock('../data/database', () => ({
    initDb: jest.fn((callback) => callback(null, {})),
    getDatabase: jest.fn()
}));

const request = require('supertest');
const mongodb = require('../data/database');
const app = require('../server');
const { ObjectId } = require('mongodb');

const id = '507f1f77bcf86cd799439011';

beforeEach(() => {
    const record = { _id: new ObjectId(id), name: 'Test', title: 'Test' };

    mongodb.getDatabase.mockReturnValue({
        collection: () => ({
            find: () => ({
                toArray: jest.fn().mockResolvedValue([record])
            }),
            findOne: jest.fn().mockResolvedValue(record)
        })
    });
});

const collections = ['categories', 'recipes', 'users', 'ratings'];

describe('GET ALL routes', () => {
    test.each(collections)('GET /%s returns 200', async (collection) => {
        const response = await request(app).get(`/${collection}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe('GET by ID routes', () => {
    test.each(collections)('GET /%s/:id returns 200', async (collection) => {
        const response = await request(app).get(`/${collection}/${id}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});
