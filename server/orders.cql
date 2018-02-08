DROP KEYSPACE IF EXISTS orders_services;

CREATE KEYSPACE orders_services WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 3};

USE orders_services;

CREATE TABLE orders (id uuid, user_id int, product_id int, quant int, ordered_at timestamp, PRIMARY KEY(user_id, quant)) WITH CLUSTERING ORDER BY (quant DESC);


CREATE MATERIALIZED VIEW orders_services.orders_by_date
AS SELECT user_id, quant, ordered_at
FROM orders
WHERE ordered_at IS NOT NULL AND user_id IS NOT NULL AND quant IS NOT NULL
PRIMARY KEY ((user_id, quant), ordered_at)
WITH CLUSTERING ORDER BY (ordered_at ASC);

CREATE MATERIALIZED VIEW orders_services.orders_by_quant
AS SELECT *
FROM orders
WHERE quant IS NOT NULL AND user_id IS NOT NULL AND ordered_at IS NOT NULL
PRIMARY KEY ((user_id, ordered_at), quant)
WITH CLUSTERING ORDER BY (quant DESC);
