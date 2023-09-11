import { validateNewBooking, validateWorkingHours } from './validators';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Restaurant from '../models/restaurant';
import Table from '../models/table';
import Booking from '../models/booking';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // mongoServer = new MongoMemoryServer();
  // const mongoUri = await mongoServer.getUri();
  // await mongoose.connect(mongoUri);

  mongoServer = new MongoMemoryServer();
  await mongoServer.start();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Restaurant.deleteMany({});
  await Table.deleteMany({});
  await Booking.deleteMany({});
});

describe('validateNewBooking', () => {
  describe('validateNewBooking', () => {
  
    it('should return error for invalid booking data', async () => {
      const result = await validateNewBooking({} as any);
      expect(result).toEqual({ error: true, errorMessage: 'Invalid booking data' });
    });
  
    it('should return error if table does not exist', async () => {
      const result = await validateNewBooking({ tableNumber: 1, bookingTime: '2023-10-10T10:00:00Z', numberOfPeople: 2 });
      expect(result).toEqual({ error: true, errorMessage: 'Table does not exist' });
    });
  
    it('should return error if restaurant does not exist', async () => {
      await Table.create({ tableNumber: 1, restaurantId: 'someRestaurantId' });
      
      const result = await validateNewBooking({ tableNumber: 1, bookingTime: '2023-10-10T10:00:00Z', numberOfPeople: 2 });
      expect(result).toEqual({ error: true, errorMessage: 'Restaurant does not exist' });
    });
  
    it('should return error if conflicting booking exists', async () => {
      const restaurantId = (await Restaurant.create({ workingHours: { start: 10, end: 18 } }))._id;
      await Table.create({ tableNumber: 1, restaurantId });
      await Booking.create({ tableNumber: 1, bookingTime: new Date('2023-10-10T11:00:00Z'), numberOfPeople: 2 });
  
      const result = await validateNewBooking({ tableNumber: 1, bookingTime: '2023-10-10T10:01:00Z', numberOfPeople: 2 });
      expect(result).toEqual({ error: true, errorMessage: 'Conflicting booking exists' });
    });
  
    it('should return null if booking details are valid', async () => {
      const restaurantId = (await Restaurant.create({ workingHours: { start: 10, end: 18 } }))._id;
      await Table.create({ tableNumber: 1, restaurantId });
  
      const result = await validateNewBooking({ tableNumber: 1, bookingTime: '2023-10-10T10:00:00Z', numberOfPeople: 2 });
      expect(result).toBeNull();
    });
  });  
});

describe('validateWorkingHours', () => {
  
  it('should return null for valid working hours and restaurant ID', () => {
    const result = validateWorkingHours('someValidRestaurantId', { start: 8, end: 16 });
    expect(result).toBeNull();
  });

  it('should return error for invalid start time', () => {
    const result = validateWorkingHours('someValidRestaurantId', { start: -1, end: 16 });
    expect(result).toEqual({ error: true, errorMessage: 'Request body contains invalid workingHours property' });
  });

  it('should return error for invalid end time', () => {
    const result = validateWorkingHours('someValidRestaurantId', { start: 8, end: 25 });
    expect(result).toEqual({ error: true, errorMessage: 'Request body contains invalid workingHours property' });
  });

  it('should return error for missing restaurant ID', () => {
    const result = validateWorkingHours('', { start: 8, end: 16 });
    expect(result).toEqual({ error: true, errorMessage: 'Invalid restaurantId value provided' });
  });
});

