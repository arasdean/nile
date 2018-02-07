const koa = require('koa');
const app = new koa();
const cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ["172.17.0.3/16"], keyspace: 'test'});

client.connect((err, results) => {
  console.log('cassandra connected!')
})
let startTime = new Date();
/*
insert into orders (id, user_id, user_email, product_id, quant, viewed_at) values (uuid(), 5, 'janet@gmail.com', 5, 60, dateof(now()))
*/
client.execute("SELECT * FROM test.experiment", [], { prepare : true }, (err, results) => {
  console.log(results)
  console.log(`Duration: ${(new Date() - startTime) / 1000}s`);
});



app.use(ctx => {
  ctx.body = 'well';
})

app.listen(3000)
console.log("server on")
