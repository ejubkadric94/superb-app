import Router from 'koa-router';
import Restaurant from '../models/restaurant';
import { WorkingHours } from '../typescript/types';
import Table from '../models/table';

const restaurantRouter = new Router({ prefix: '/restaurant' });

restaurantRouter.post('/:restaurantId/setWorkingHours', async (ctx) => {
  const { restaurantId } = ctx.params;
  const { start, end } = ctx.request.body as WorkingHours;
  
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

restaurantRouter.get('/:restaurantId/tables', async (ctx) => {
  try {
    const tables = await Table.find({ restaurantId: ctx.params.restaurantId });
    ctx.body = tables;
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
  ctx.body = {};
});

export default restaurantRouter;