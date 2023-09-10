import Router from 'koa-router';
import Table from '../models/table';

const tableRouter = new Router({ prefix: '/table' });

tableRouter.post('/', async (ctx) => {
  const { restaurantId } = ctx.request.body as { restaurantId: string };
  console.log(restaurantId, ctx.request.body)
  if (!restaurantId) {
    ctx.status = 400;
    ctx.body = { error: 'Bad Request', message: 'No restaurantId provided' };
    return;
  }

  const numberOfTables = await Table.countDocuments({ restaurantId });
  ctx.body = await Table.create({ restaurantId, tableNumber: numberOfTables + 1 });
});

tableRouter.get('/', async (ctx) => {
  try {
    const restaurantId = ctx.query.restaurantId;
    if (!restaurantId) {
      ctx.status = 400;
      ctx.body = { error: 'Bad Request', message: 'No restaurantId provided' };
      return;
    }
    console.log(restaurantId)
    const tables = await Table.find({ restaurantId });
    ctx.body = tables;
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
});

export default tableRouter;