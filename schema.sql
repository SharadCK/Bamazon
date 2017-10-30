CREATE DATABASE storeIn;

DROP TABLE IF EXISTS products;

CREATE TABLE products (id INT(10) AUTO_INCREMENT, product_Name VARCHAR(20) NOT NULL, department_name VARCHAR(20) NOT NULL, price FLOAT (10,2) DEFAULT NULL, quantity_Sock INT(10), PRIMARY KEY (id));

INSERT INTO products (id, product_Name, department_name, price, quantity_Sock) VALUES (1, 'mobile', 'electronics', 120.00, 12),
        (2, 'television', 'electronics', 450.00, 20),
        (3, 'headphone', 'electronics', 110.45, 35),
        (4, 'shirt', 'clothing', 45.00, 85),
        (5, 'pants', 'clothing', 55.00, 80),
        (6, 'table', 'furniture', 135.55, 10),
        (7, 'chair', 'furniture', 75.36, 20),
        (8, 'fridge', 'appliances', 250.00, 15),
        (9, 'mixer', 'appliances', 40.00, 65),
        (10, 'washing machine', 'electronics', 150.45, 15);
        
SELECT * FROM products;