DROP DATABASE IF EXISTS solocalzado_db;
CREATE DATABASE solocalzado_db;
USE solocalzado_db;

CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `title` VARCHAR(100) NOT NULL DEFAULT "",
   `description` TEXT DEFAULT "",
   `price` DECIMAL(10,2) NOT NULL DEFAULT "0",
   `productgender_id` INT NOT NULL,
   `brand_id` INT NOT NULL,
   `image` VARCHAR(255) DEFAULT "default-image.png",
   PRIMARY KEY (`id`)
);

CREATE TABLE `productgenders` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100),
   PRIMARY KEY (`id`)
);

CREATE TABLE `brands` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `colors` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100),
   PRIMARY KEY (`id`)
);

CREATE TABLE `sizes` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `num` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `username` VARCHAR(100) NOT NULL,
   `first_name` VARCHAR(100),
   `last_name` VARCHAR(100),
   `born_date` DATE,
   `email` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `usergender_id` INT NOT NULL,
   `usercategory_id` INT NOT NULL,
   `avatar` VARCHAR(100),
   PRIMARY KEY (`id`)
);

CREATE TABLE `carts` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `user_id` INT NOT NULL,
   `state` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `usercategories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100),
   PRIMARY KEY (`id`)
);

CREATE TABLE `cart_product` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `cart_id` INT,
   `product_id` INT,
   `amount` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `product_size_color` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `product_id` INT NOT NULL,
   `size_id` INT NOT NULL,
   `color_id` INT NOT NULL,
   `stock` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `usergenders` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100),
   PRIMARY KEY (`id`)
);

ALTER TABLE `products` ADD CONSTRAINT `FK_4678dd58-7592-4012-8c90-52d712a5b613` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_56f156ba-35c6-4d45-8d99-c56eff8502bc` FOREIGN KEY (`productgender_id`) REFERENCES `productgenders`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_cbef446d-07fb-436f-8f1d-765605e15a2d` FOREIGN KEY (`usercategory_id`) REFERENCES `usercategories`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_2dc03b6f-e380-4c4b-a5c8-9b660ba7f75d` FOREIGN KEY (`usergender_id`) REFERENCES `usergenders`(`id`)  ;

ALTER TABLE `cart_product` ADD CONSTRAINT `FK_9f58da6d-7722-431d-acb2-9f0ebf07feda` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`)  ;

ALTER TABLE `cart_product` ADD CONSTRAINT `FK_6853e757-6f21-46c2-87c3-74a589f35954` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `product_size_color` ADD CONSTRAINT `FK_d5aa5fcf-e233-4ede-97ee-5141ed79f96a` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `product_size_color` ADD CONSTRAINT `FK_ca5ede5a-beac-4716-bfce-aa6465e431bb` FOREIGN KEY (`size_id`) REFERENCES `sizes`(`id`)  ;

ALTER TABLE `product_size_color` ADD CONSTRAINT `FK_8260c864-b522-4f22-be27-606d6a5dbd05` FOREIGN KEY (`color_id`) REFERENCES `colors`(`id`)  ;