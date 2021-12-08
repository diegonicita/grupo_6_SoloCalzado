DROP DATABASE IF EXISTS solocalzado_db;
CREATE DATABASE solocalzado_db;
USE solocalzado_db;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `email` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `avatar` VARCHAR(100) DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,  
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `description` text DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `user_id` INT NOT NULL,
   `status` INT NOT NULL DEFAULT 0,
   `products` INT NOT NULL DEFAULT 0,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`) VALUES (null, "user1", "user1@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm", "user-placeholder.png");
INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`) VALUES (null, "user2", "user2@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm", "user-placeholder.png");
INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`) VALUES (null, "user3", "user3@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm", "user-placeholder.png");
INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`) VALUES (null, "user4", "user4@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm", "user-placeholder.png");

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`) VALUES (null, "Zapatilla Generica 1", "Zapatilla muy Generica numero 1", "1529", "zapatilla001.png");
INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`) VALUES (null, "Zapatilla Generica 2", "Zapatilla muy Generica numero 2", "2529", "zapatilla002.png");
INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`) VALUES (null, "Zapatilla Generica 3", "Zapatilla muy Generica numero 3", "3529", "zapatilla003.png");
INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`) VALUES (null, "Zapatilla Generica 4", "Zapatilla muy Generica numero 4", "4529", "zapatilla004.png");

INSERT INTO `categories` (`id`, `name`, `description`) VALUES (null, "Categoria 1", "Esta es una categoria 1");
INSERT INTO `categories` (`id`, `name`, `description`) VALUES (null, "Categoria 2", "Esta es una categoria 2");
INSERT INTO `categories` (`id`, `name`, `description`) VALUES (null, "Categoria 3", "Esta es una categoria 3");
INSERT INTO `categories` (`id`, `name`, `description`) VALUES (null, "Categoria 4", "Esta es una categoria 4");

INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (null, 1, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (null, 2, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (null, 3, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (null, 4, 0, 0);