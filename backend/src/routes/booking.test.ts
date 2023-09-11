import request from 'supertest';
import app from '../server';
import Booking from '../models/booking';
import mongoose from 'mongoose';
import Restaurant from '../models/restaurant';
import Table from '../models/table';

beforeAll(async () => {
  await mongoose.createConnection('mongodb://localhost:27017/superbBookingTest');
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
  await Table.create({ restaurantId: '6b2c3572-8e2f-4bbe-b2bf-d4279608e93f', tableNumber: 2 });
});
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /booking', () => {
  it('should create a new table and booking', async () => {
    const res = await request(app.callback())
      .post('/booking')
      .send({
        tableNumber: 2,
        bookingTime: new Date().toISOString(),
        numberOfPeople: 4,
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');

    // remove this booking so no conflict is created for subsequent tests
    await Booking.deleteOne({ _id: res.body._id })
  });

  it('should return 400 for invalid booking data', async () => {
    const res = await request(app.callback())
      .post('/booking')
      .send({});
    
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid booking data' });
  });
});

describe('GET /booking', () => {
  it('should fetch bookings by table number', async () => {
    const res = await request(app.callback())
      .get('/booking')
      .query({ tableNumber: 2 });
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 400 for invalid table number', async () => {
    const res = await request(app.callback())
      .get('/booking')
      .query({});
    
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid tableNumber value provided' });
  });
});

describe('DELETE /booking/:bookingId', () => {
  it('should delete a booking by ID', async () => {
    const createRes = await request(app.callback())
      .post('/booking')
      .send({
        tableNumber: 2,
        bookingTime: new Date().toISOString(),
        numberOfPeople: 4,
      });

    const bookingId = createRes.body._id;

    const res = await request(app.callback())
      .delete(`/booking/${bookingId}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('deletedCount', 1);
  });

  it('should return 400 for invalid booking ID', async () => {
    const res = await request(app.callback())
      .delete('/booking/invalidBookingId');

    expect(res.body).toHaveProperty('deletedCount', 0);
  });
});

describe('POST /table', () => {
  it('should create a new table', async () => {
    const res = await request(app.callback())
      .post('/table')
      .send({ restaurantId: 'someValidRestaurantId' });

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
      .query({ restaurantId: 'someValidRestaurantId' });

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
