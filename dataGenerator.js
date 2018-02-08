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

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'testing2'});
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
    var randomQuant = Math.round(Math.random() * (200 -1) + 1);
    var randomProduct = Math.round(Math.random() * (10000000 - 1) + 1)
// Below is the former query that I used to brute force insert into the DB before copying CSV file     
// client.execute("insert into orders (id, user_id, user_email, product_id, quant, viewed_at) values (uuid(), " + randomUserId + ", '" + randomEmail + "'," + randomProduct + "," + randomQuant + ", dateof(now()));")

    let record = {
      user_id: randomUserId,
      product_id: randomProduct,
      quant: randomQuant,
      id: faker.random.uuid(),
      ordered_at: faker.date.recent().getTime()
    }

    records[i] = record;
}

csvWriter.writeRecords(records)
.then(()=>{
  console.log('Done...')
})
.catch((err) => {console.error(err)})

// Written in Shell:
// COPY orders (user_id, product_id, quant, id, ordered_at) FROM '/Users/arasdean/Desktop/Hack_Reactor/thesis/orders.csv';
