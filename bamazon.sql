DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("New Yorker", "magazine", 6, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("ale", "beer_and_wine", 4, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("socks", "mens_clothing", 6, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("underwear", "mens_clothing", 12, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("bra", "womens_clothing", 14, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("notebook", "paper_goods", 5, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("cast_iron", "kitchen", 40, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("blender", "kitchen", 25, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("Jacobin", "magazine", 16, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("stout", "beer_and_wine", 8, 100);


