module.exports = {
  'up': 'create table `staff` (`staff_id` int(11) not null auto_increment, `name` varchar(63), `position` varchar(95), `experience` int(11), `company_id` int(11), `skills` varchar(255), `main_user_id` int(11) not null, primary key (staff_id))',
  'down': 'drop table staff'
};
