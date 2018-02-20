module.exports = {
  'up': 'CREATE TABLE `users` (`user_id` int(11) NOT NULL AUTO_INCREMENT,`first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`second_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,`role` varchar(100) not null default "guest", PRIMARY KEY (`user_id`)) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;',
  'down': 'DROP TABLE users'
};
