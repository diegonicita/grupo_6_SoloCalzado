DROP DATABASE IF EXISTS solocalzado_db;
CREATE DATABASE solocalzado_db;
USE solocalzado_db;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `email` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `offer` tinyint(4) DEFAULT '0',
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
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

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `created_at`, `deleted_at`, `updated_at`, `offer`) VALUES (null, 'Zapatilla Generica 1', 'Zapatilla muy Generica numero 1', '1529', NULL, NULL, NULL, NULL, 15);
INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `created_at`, `deleted_at`, `updated_at`, `offer`) VALUES (null, 'Zapatilla Generica 2', 'Zapatilla muy Generica numero 2', '2529', NULL, NULL, NULL, NULL, 5);
INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `created_at`, `deleted_at`, `updated_at`, `offer`) VALUES (null, 'Zapatilla Generica 2', 'Zapatilla muy Generica numero 3', '3529', NULL, NULL, NULL, NULL, 25);
INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `created_at`, `deleted_at`, `updated_at`, `offer`) VALUES (null, 'Zapatilla Generica 2', 'Zapatilla muy Generica numero 4', '4529', NULL, NULL, NULL, NULL, 0);