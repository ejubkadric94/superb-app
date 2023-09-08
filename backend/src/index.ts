import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import bookingRouter from './routes/booking';
import tableRouter from './routes/table';
import restaurantRouter from './routes/restaurant';

mongoose.connect('mongodb://localhost:27017', { dbName: 'superb',  });

const app: Koa = new Koa();

app.use(bodyParser());
app.use(bookingRouter.routes()).use(bookingRouter.allowedMethods());
app.use(tableRouter.routes()).use(tableRouter.allowedMethods());
app.use(restaurantRouter.routes()).use(restaurantRouter.allowedMethods());

const router: Router = new Router();
router.get('/', async (ctx) => {
    ctx.body = 'Hello, Koa with TypeScript!';
});
app.use(router.routes()).use(router.allowedMethods());

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
