DROP DATABASE IF EXISTS solocalzado_db;
CREATE DATABASE solocalzado_db;
USE solocalzado_db;

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `user_id` INT NOT NULL,
   `status` INT NOT NULL DEFAULT 0,
   `products` INT NOT NULL DEFAULT 0,
   PRIMARY KEY (`id`)
);

INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 1, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 2, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 3, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 4, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 5, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 6, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 7, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 8, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 9, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 10, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 11, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 12, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 13, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 14, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 15, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 16, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 17, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 18, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 19, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 20, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 21, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 22, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 23, 0, 0);
INSERT INTO `carts` (`id`, `user_id`, `status`, `products`) VALUES (NULL, 24, 0, 0);

