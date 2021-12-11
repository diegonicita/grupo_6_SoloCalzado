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

DROP TABLE IF EXISTS `users`;
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
   `avatar` VARCHAR(100) DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `usercategories`;
CREATE TABLE `usercategories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `usergenders`;
CREATE TABLE `usergenders` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `users` ADD CONSTRAINT `FK_cbef446d-07fb-436f-8f1d-765605e15a2d` FOREIGN KEY (`usercategory_id`) REFERENCES `usercategories`(`id`);
ALTER TABLE `users` ADD CONSTRAINT `FK_2dc03b6f-e380-4c4b-a5c8-9b660ba7f75d` FOREIGN KEY (`usergender_id`) REFERENCES `usergenders`(`id`);
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

INSERT INTO `usercategories` (`id`, `name`) values (null, "Usuario Comun");
INSERT INTO `usercategories` (`id`, `name`) values (null, "Usuario Avanzado");
INSERT INTO `usercategories` (`id`, `name`) values (null, "Administrador");

INSERT INTO `usergenders` (`id`, `name`) values (null, "No Informado");
INSERT INTO `usergenders` (`id`, `name`) values (null, "Femenino");
INSERT INTO `usergenders` (`id`, `name`) values (null, "Masculino");
INSERT INTO `usergenders` (`id`, `name`) values (null, "Otres");

INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 1", "Zapatilla Generica numero 1", 1529, "zapatilla001.png",1,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 2", "Zapatilla Generica numero 2", 2529, "zapatilla002.png",1,2);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 3", "Zapatilla Generica numero 3", 3529, "zapatilla003.png",1,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 4", "Zapatilla Generica numero 4", 4529, "zapatilla004.png",1,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 1", "Zapatilla Generica numero 1", 1529, "zapatilla001.png",2,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 2", "Zapatilla Generica numero 2", 2529, "zapatilla002.png",2,2);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 3", "Zapatilla Generica numero 3", 3529, "zapatilla003.png",2,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 4", "Zapatilla Generica numero 4", 4529, "zapatilla004.png",2,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 1", "Zapatilla Generica numero 1", 1529, "zapatilla001.png",3,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 2", "Zapatilla Generica numero 2", 2529, "zapatilla002.png",3,2);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 3", "Zapatilla Generica numero 3", 3529, "zapatilla003.png",3,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 4", "Zapatilla Generica numero 4", 4529, "zapatilla004.png",3,3);

INSERT INTO `users` (`id`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "user1", "user1@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm",1,1,"user-placeholder.png");
INSERT INTO `users` (`id`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "user2", "user2@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm",1,1,"user-placeholder.png");
INSERT INTO `users` (`id`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "user3", "user3@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm",1,1,"user-placeholder.png");
INSERT INTO `users` (`id`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "user4", "user4@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm",1,1,"user-placeholder.png");