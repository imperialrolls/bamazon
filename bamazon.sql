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
VALUES ("two person tent", "camping", 130, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("wool socks", "clothing", 13, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("hemp shirt", "clothing", 40, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("underwear", "clothing", 12, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("propane stove", "camping", 85, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("trail map", "books", 5, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("cast_iron", "cooking", 40, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("knife", "cooking", 25, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("star map", "books", 16, 100);

INSERT INTO products (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("hammock", "camping", 8, 100);


