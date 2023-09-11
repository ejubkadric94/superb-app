import request from 'supertest';
import app from '../server';
import mongoose from 'mongoose';
import Restaurant from '../models/restaurant';

beforeAll(async () => {
  await mongoose.createConnection('mongodb://localhost:27017/superbTableTest');
  await mongoose.connection.dropDatabase();

  await Restaurant.create({
    _id: "6b2c3572-8e2f-4bbe-b2bf-d4279608e93f",
    restaurantName: "Superb Restaurant",
    workingHours: {
      start: 8,
      end: 23,
    },
    managerIds: [],
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /table', () => {
  it('should create a new table', async () => {
    const res = await request(app.callback())
      .post('/table')
      .send({ restaurantId: '6b2c3572-8e2f-4bbe-b2bf-d4279608e93f' });

    expect(res.status).toBe(200);
  });

  it('should return 400 for missing restaurantId', async () => {
    const res = await request(app.callback())
      .post('/table')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Bad Request', message: 'No restaurantId provided' });
  });
});

describe('GET /table', () => {
  it('should get all tables for a restaurant', async () => {
    const res = await request(app.callback())
      .get('/table')
      .query({ restaurantId: '6b2c3572-8e2f-4bbe-b2bf-d4279608e93f' });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 400 for missing restaurantId', async () => {
    const res = await request(app.callback())
      .get('/table')
      .query({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Bad Request', message: 'No restaurantId provided' });
  });
});
