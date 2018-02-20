module.exports = {
  'up': 'create table `company` (`company_id` int(11) not null auto_increment, `name` varchar(64), `type` varchar(64), `address` varchar(255), `staff_id` int(11), `main_user_id` int(11) not null, `hasStaff` tinyint(1) default 0, primary key (company_id))',
  'down': 'drop table company'
};
