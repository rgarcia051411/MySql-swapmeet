DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NULL,
	department_name VARCHAR(100) NULL,
	price DECIMAL (10,2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (id)

);

SELECT * FROM products;



INSERT INTO products (product_name, department_name, price, stock_quantity)


VALUES ("SHADES", "APPAREL", 200, 10), ("IRON MAN", "MOVIES", 15, 20), ("BOOTS", "APPAREL", 250, 10), ("KAYAK", "OUTDOORS", 600, 5), ("BASE BALL", "SPORTS", 25, 30), ("FISHING ROD", "OUTDOORS", 120, 11), ("CELLPHONE", "ELECTRONICS", 700, 30), ("MAC BOOK PRO", "ELECTRONICS", 2500, 10), ("BEER", "ALCOHOL", 10, 100), ("PIZZA", " FOOD", 17, 200)
