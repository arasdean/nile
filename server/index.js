//const nr = require('newrelic');
const koa = require('koa');
const logger = require('koa-logger')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const app = new koa();
var router = new Router();
//const cassandra = require('cassandra-driver');
//const database = new cassandra.Client({contactPoints: ["127.0.0.1:9042"], keyspace: 'orders_services'});
//database.connect((err, results) => {
//  console.log('cassandra connected!')
//})

app.use(logger())
  .use(bodyParser()) 
  .use(router.allowedMethods())
  .use(router.routes())


router.get('/', (ctx) => {
  ctx.body = 'hey there!'
})

router.post('/orders', async (ctx, next) => {
    const {user_id, product_id, quant } = ctx.request.body;
    //let startTime = new Date();
    await database.execute("insert into orders_services.orders (id, user_id, product_id, quant, ordered_at) values (uuid(), ? , ? , ?, dateof(now()));",
     [user_id, product_id, quant], { prepare : true })
     .then((results) => {
      // console.log(`Duration: ${(new Date() - startTime) / 1000}s`);
       ctx.status = 201;
       ctx.body = {done: 'done'}
    })
    .catch((err) => {
      if(err) {console.log(err);}
    })
    next()
})

app.listen(3000)
