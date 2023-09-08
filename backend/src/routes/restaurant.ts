import Router from 'koa-router';
import Restaurant from '../models/restaurant';
import { WorkingHours } from '../typescript/types';

const restaurantRouter = new Router({ prefix: '/restaurant' });

restaurantRouter.post('/', async (ctx) => {
  ctx.body = await Restaurant.create({
    restaurantName: 'Superb Restaurant',
    workingHours: {
      start: 8,
      end: 23
    },
    managerIds: ["e5a202c5-cdd5-45d1-89ff-74bc2b238310"],
  });
});

restaurantRouter.post('/:restaurantId/setWorkingHours', async (ctx) => {
  const { restaurantId } = ctx.params;
  const { start, end }: WorkingHours = ctx.request.body as WorkingHours; // The body object will contain the parsed request body
  
  if (start === undefined || end === undefined || typeof start !== 'number' || typeof end !== 'number') {
    ctx.status = 400;
    ctx.body = { error: 'Bad Request', message: 'Request body contains invalid workingHours property' };
    return;
  }
  
  if (!restaurantId) {
    ctx.status = 400;
    ctx.body = { error: 'Bad Request', message: 'Invalid restaurantId value provided' };
    return;
  }

  const updatedRestaurant = await Restaurant.updateOne({ _id: restaurantId }, { workingHours: { start, end } })

  ctx.body = updatedRestaurant;
});

restaurantRouter.get('/', async (ctx) => {
  try {
    const restaurants = await Restaurant.find({});
    ctx.body = { restaurants };
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
});

export default restaurantRouter;