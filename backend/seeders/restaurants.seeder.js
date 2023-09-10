import { Seeder } from 'mongoose-data-seed';
import Restaurant from '../src/models/restaurant';

const data = [{
  _id: "6b2c3572-8e2f-4bbe-b2bf-d4279608e93f",
  restaurantName: "Superb Restaurant",
  workingHours: {
    start: 8,
    end: 23,
  },
  managerIds: [],
}];

class RestaurantsSeeder extends Seeder {

  async shouldRun() {
    console.log('AAAAAAA')
    return Restaurant.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    console.log('AAAAAAA')
    return Restaurant.create(data);
  }
}

export default RestaurantsSeeder;
