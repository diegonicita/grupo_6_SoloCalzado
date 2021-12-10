DROP DATABASE IF EXISTS solocalzado_db;
CREATE DATABASE solocalzado_db;
USE solocalzado_db;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `title` VARCHAR(100) NOT NULL DEFAULT "",
   `description` TEXT DEFAULT "",
   `price` DECIMAL(10,2) NOT NULL DEFAULT 0,
   `productgender_id` INT NOT NULL,
   `brand_id` INT NOT NULL,
   `image` VARCHAR(255) DEFAULT "default-image.png",
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `productgenders` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `brands` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `colors` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `sizes` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `num` INT NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `product_color` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `color_id` INT,
   `product_id` INT,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `product_size` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `product_id` INT NOT NULL,
   `size_id` INT NOT NULL,
   `stock` INT NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- CREATE TABLE `products` (
-- `id` INT NOT NULL AUTO_INCREMENT,
-- `title` varchar(100) DEFAULT NULL,
-- `description` varchar(255) DEFAULT NULL,
-- `price` decimal(10,2) DEFAULT NULL,
-- `image` varchar(300) DEFAULT NULL,  
-- PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `email` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `avatar` VARCHAR(100) DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- DROP TABLE IF EXISTS `categories`;
-- CREATE TABLE `categories` (
   -- `id` INT NOT NULL AUTO_INCREMENT,
   -- `name` VARCHAR(100) NOT NULL,
   -- `description` text DEFAULT NULL,
   -- PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- DROP TABLE IF EXISTS `carts`;
-- CREATE TABLE `carts` (
   -- `id` INT NOT NULL AUTO_INCREMENT,
   -- `user_id` INT NOT NULL,
   -- `status` INT NOT NULL DEFAULT 0,
   -- `products` INT NOT NULL DEFAULT 0,
   -- PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `products` ADD CONSTRAINT `FK_4678dd58-7592-4012-8c90-52d712a5b613` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`);
ALTER TABLE `products` ADD CONSTRAINT `FK_56f156ba-35c6-4d45-8d99-c56eff8502bc` FOREIGN KEY (`productgender_id`) REFERENCES `productgenders`(`id`);
ALTER TABLE `product_color` ADD CONSTRAINT `FK_0bd5eead-c17f-40f4-a45f-23e2a897a877` FOREIGN KEY (`color_id`) REFERENCES `colors`(`id`);
ALTER TABLE `product_color` ADD CONSTRAINT `FK_51a775a2-9223-44f0-8871-ea1fc528f172` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`);
ALTER TABLE `product_size` ADD CONSTRAINT `FK_d5aa5fcf-e233-4ede-97ee-5141ed79f96a` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`);
ALTER TABLE `product_size` ADD CONSTRAINT `FK_ca5ede5a-beac-4716-bfce-aa6465e431bb` FOREIGN KEY (`size_id`) REFERENCES `sizes`(`id`);

INSERT INTO `productgenders` (`id`, `name`) values (null, "Niños");
INSERT INTO `productgenders` (`id`, `name`) values (null, "Femenino");
INSERT INTO `productgenders` (`id`, `name`) values (null, "Masculino");

INSERT INTO `brands` (`id`, `name`) values (null, "Adidas");
INSERT INTO `brands` (`id`, `name`) values (null, "Nike");
INSERT INTO `brands` (`id`, `name`) values (null, "Puma");

INSERT INTO `colors` (`id`, `name`) values (null, "Rojo");
INSERT INTO `colors` (`id`, `name`) values (null, "Azul");
INSERT INTO `colors` (`id`, `name`) values (null, "Verde");

INSERT INTO `sizes` (`id`, `num`) values (null, 37);
INSERT INTO `sizes` (`id`, `num`) values (null, 38);
INSERT INTO `sizes` (`id`, `num`) values (null, 39);

INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 1", "Zapatilla muy Generica numero 1", 1529, "zapatilla001.png",1,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 2", "Zapatilla muy Generica numero 2", 2529, "zapatilla002.png",1,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 3", "Zapatilla muy Generica numero 3", 3529, "zapatilla003.png",1,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 4", "Zapatilla muy Generica numero 4", 4529, "zapatilla004.png",1,1);

INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`) VALUES (null, "user1", "user1@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm", "user-placeholder.png");
INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`) VALUES (null, "user2", "user2@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm", "user-placeholder.png");
INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`) VALUES (null, "user3", "user3@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm", "user-placeholder.png");
INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`) VALUES (null, "user4", "user4@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm", "user-placeholder.png");

-- INSERT INTO `categories` (`id`, `name`, `description`) VALUES (null, "Categoria 1", "Esta es una categoria 1");
-- INSERT INTO `categories` (`id`, `name`, `description`) VALUES (null, "Categoria 2", "Esta es una categoria 2");
-- INSERT INTO `categories` (`id`, `name`, `description`) VALUES (null, "Categoria 3", "Esta es una categoria 3");
-- INSERT INTO `categories` (`id`, `name`, `description`) VALUES (null, "Categoria 4", "Esta es una categoria 4");

-- INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (null, 1, 0, 0);
-- INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (null, 2, 0, 0);
-- INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (null, 3, 0, 0);
-- INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (null, 4, 0, 0);