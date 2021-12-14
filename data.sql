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

INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 1", "Zapatilla Generica numero 1", 1529, "zapa-kids-1.jpg",1,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 2", "Zapatilla Generica numero 2", 2529, "zapa-kids-2.jpg",1,2);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 3", "Zapatilla Generica numero 3", 3529, "zapa-kids-3.jpg",1,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 4", "Zapatilla Generica numero 4", 4529, "zapa-kids-4.jpg",1,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 1", "Zapatilla Generica numero 1", 1529, "zapa-mujer-1.jpg",2,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 2", "Zapatilla Generica numero 2", 2529, "zapa-mujer-2.jpg",2,2);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 3", "Zapatilla Generica numero 3", 3529, "zapa-mujer-3.jpg",2,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 4", "Zapatilla Generica numero 4", 4529, "zapa-mujer-4.jpg",2,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 1", "Zapatilla Generica numero 1", 1529, "zapa-hombre-1.jpg",3,1);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 2", "Zapatilla Generica numero 2", 2529, "zapa-hombre-2.jpg",3,2);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 3", "Zapatilla Generica numero 3", 3529, "zapa-hombre-3.jpg",3,3);
INSERT INTO `products` (`id`, `title`, `description`, `price`, `image`, `productgender_id`, `brand_id`) VALUES (null, "Zapatilla Generica 4", "Zapatilla Generica numero 4", 4529, "zapa-hombre-4.jpg",3,3);

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "Juan", "Perez", "user1", "user1@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm",1,1,"user-placeholder.png");
INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "Juan", "Perez", "user2", "user2@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm",1,1,"user-placeholder.png");
INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "Juan", "Perez", "user3", "user3@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm",1,1,"user-placeholder.png");
INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `usergender_id`, `usercategory_id`, `avatar`) VALUES (null, "Juan", "Perez", "user4", "user4@gmail.com", "$2a$10$xlqlLmgzHRvQaji0Ib/ZCOzBWzodfqBMhDSZMxuSJCDHcCV2szdvm",1,1,"user-placeholder.png");

INSERT INTO `product_size` (`id`, `product_id`,`color_id`, `size_id`, `stock`) VALUES (null, 1, 1, 1, 1);
INSERT INTO `product_size` (`id`, `product_id`,`color_id`, `size_id`, `stock`) VALUES (null, 1, 1, 2, 1);
INSERT INTO `product_size` (`id`, `product_id`,`color_id`, `size_id`, `stock`) VALUES (null, 2, 1, 1, 1);
INSERT INTO `product_size` (`id`, `product_id`,`color_id`, `size_id`, `stock`) VALUES (null, 2, 1, 2, 1);

INSERT INTO `product_color` (`id`, `color_id`, `product_id`) VALUES (null, 1, 1);
INSERT INTO `product_color` (`id`, `color_id`, `product_id`) VALUES (null, 2, 1);
INSERT INTO `product_color` (`id`, `color_id`, `product_id`) VALUES (null, 1, 2);
INSERT INTO `product_color` (`id`, `color_id`, `product_id`) VALUES (null, 2, 2);