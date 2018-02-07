DROP KEYSPACE IF EXISTS testing2;

CREATE KEYSPACE testing2 WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 3};

USE testing2;

CREATE TABLE orders (id uuid, user_id int, product_id int, quant int, ordered_at timestamp, PRIMARY KEY(user_id, quant)) WITH CLUSTERING ORDER BY (quant DESC);
