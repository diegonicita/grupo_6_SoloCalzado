INSERT INTO `productgenders` (`id`, `name`) values (null, "Niños");
INSERT INTO `productgenders` (`id`, `name`) values (null, "Femenino");
INSERT INTO `productgenders` (`id`, `name`) values (null, "Masculino");
INSERT INTO `productgenders` (`id`, `name`) values (null, "Unisex");

INSERT INTO `brands` (`id`, `name`) values (null, "Adidas");
INSERT INTO `brands` (`id`, `name`) values (null, "Nike");
INSERT INTO `brands` (`id`, `name`) values (null, "Puma");
INSERT INTO `brands` (`id`, `name`) values (null, "Fila");

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

INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 1", "Zapatilla Generica numero 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 1529, "zapa-kids-1.jpg",1,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 2", "Zapatilla Generica numero 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 2529, "zapa-kids-2.jpg",1,2);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 3", "Zapatilla Generica numero 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 3529, "zapa-kids-3.jpg",1,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 4", "Zapatilla Generica numero 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 4529, "zapa-kids-4.jpg",1,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 5", "Zapatilla Generica numero 5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 1529, "zapa-mujer-1.jpg",2,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 6", "Zapatilla Generica numero 6 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 2529, "zapa-mujer-2.jpg",2,2);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 7", "Zapatilla Generica numero 7 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 3529, "zapa-mujer-3.jpg",2,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 8", "Zapatilla Generica numero 8 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 4529, "zapa-mujer-4.jpg",2,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 9", "Zapatilla Generica numero 9 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 1529, "zapa-hombre-1.jpg",3,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 10", "Zapatilla Generica numero 10 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 2529, "zapa-hombre-2.jpg",3,2);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 11", "Zapatilla Generica numero 11 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 3529, "zapa-hombre-3.jpg",3,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 12", "Zapatilla Generica numero 12 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 4529, "zapa-hombre-4.jpg",3,3);

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "Juan", "Perez", "user1", "user1@gmail.com", "$2a$10$uf.y33mF2OPmQJuQA7LhVuPVpcAxBZ7EFHoynbReJjfFBD0QvoQ4G",1,3,"user-placeholder.png");
INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "Juan", "Perez", "user2", "user2@gmail.com", "$2a$10$uf.y33mF2OPmQJuQA7LhVuPVpcAxBZ7EFHoynbReJjfFBD0QvoQ4G",1,2,"user-placeholder.png");
INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "Juan", "Perez", "user3", "user3@gmail.com", "$2a$10$uf.y33mF2OPmQJuQA7LhVuPVpcAxBZ7EFHoynbReJjfFBD0QvoQ4G",1,1,"user-placeholder.png");
INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "Juan", "Perez", "user4", "user4@gmail.com", "$2a$10$uf.y33mF2OPmQJuQA7LhVuPVpcAxBZ7EFHoynbReJjfFBD0QvoQ4G",1,1,"user-placeholder.png");

INSERT INTO `product_size_color` (`id`, `product_id`,`color_id`, `size_id`, `stock`) VALUES (null, 1, 1, 1, 1);
INSERT INTO `product_size_color` (`id`, `product_id`,`color_id`, `size_id`, `stock`) VALUES (null, 1, 1, 2, 1);
INSERT INTO `product_size_color` (`id`, `product_id`,`color_id`, `size_id`, `stock`) VALUES (null, 2, 1, 1, 1);
INSERT INTO `product_size_color` (`id`, `product_id`,`color_id`, `size_id`, `stock`) VALUES (null, 2, 1, 2, 1);