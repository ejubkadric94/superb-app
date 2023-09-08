import Router from 'koa-router';
import Table from '../models/table';

const tableRouter = new Router({ prefix: '/table' });

tableRouter.post('/', async (ctx) => {
  // TODO implement restaurants
  const newTable = Object.assign({ restaurantId: '6b2c3572-8e2f-4bbe-b2bf-d4279608e93f'}, ctx.request.body);
  ctx.body = await Table.create(newTable);
});

tableRouter.get('/', async (ctx) => {
  try {
    const tables = await Table.find({});
    ctx.body = { tables };
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
});

export default tableRouter;