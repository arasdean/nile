const cassandra = require('cassandra-driver');
const faker = require('faker');
/*
NOTE:

This generation script requires the manual changing of the following ranges:
	-user_id
	-product_id
	-quant
	-id
	-ordered_at
 */
var createCsvWriter = require('csv-writer').createObjectCsvWriter;
var csvWriter = createCsvWriter({
  path: __dirname + '/ordersTotal.csv',
  header: [
    {id: 'user_id', title: 'user_id'},
    {id: 'product_id', title: 'product_id'},
    {id: 'quant', title: 'quant'},
    {id: 'id', title: 'id'},
    {id: 'ordered_at', title: 'ordered_at'},
  ]
})
let records = [];
for (var i = 0; i < 1000000; i++) {

    var randomUserId = Math.round(Math.random() * (10000000 - 9000001) + 9000001)
    var randomQuant = Math.round(Math.random() * (250 -1) + 1);
    var randomProduct = Math.round(Math.random() * (10000000 - 1) + 1)
    var date = faker.date.between('2017-12-01', '2018-02-27').toISOString();
    let record = {
      user_id: randomUserId,
      product_id: randomProduct,
      quant: randomQuant,
      id: faker.random.uuid(),
      ordered_at: date,
    }

    records[i] = record;
}


csvWriter.writeRecords(records)
.then(()=>{
  console.log('Done...')
})
.catch((err) => {console.error(err)})


/*
 ---Written in Shell:---
 COPY orders (user_id, product_id, quant, id, ordered_at) FROM '/Users/arasdean/Desktop/Hack_Reactor/thesis/orders.csv';

NOTE
Below is the former query that I used to brute force insert into the DB before copying CSV file:

 client.execute("insert into orders (id, user_id, user_email, product_id, quant, viewed_at) values (uuid(), " + randomUserId + ", '" + randomEmail + "'," + randomProduct + "," + randomQuant + ", dateof(now()));")
 */
