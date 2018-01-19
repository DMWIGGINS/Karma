# Karma

Steps to get your server up and running:

1) create your dev database locally:

In SQL WOrkbench:
create database karma_db;

2) Run your installs.  Navigate to /Karma directory in your terminal and run the following:

npm install

3) in Karma/config/config.json enter your local mysql password in the dev section

4) on the terminal command line, start the server

nodemon server.js or node server.js

![functionaldiag](https://github.com/DMWIGGINS/Karma/blob/master/app/public/assets/images/karma_functional_diagram.png)


Here is some test data to insert into your dev database if you want:

drop database if exists karma_db;
create database karma_db;

use karma_db;

select * from Groups;
select * from Users;
select * from Favors;

use karma_db;

insert into Groups (group_name, group_leader, createdAt, updatedAt) 
values ("Test Group", 1,
current_timestamp, current_timestamp);

insert into Users 
(user_name, user_email, profile_pic_link, user_karma_koins,createdAt, updatedAt, GroupId) 
values ("Test User1", "TestUser1@gmail.com", 
'https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/20992971_863919577094100_2869333698020713514_n.jpg?oh=a395c5a818832b77dd754b2cc4ece0e0&oe=5AE9A32A(4 kB)',
100, current_timestamp, current_timestamp,1);

insert into Users 
(user_name, user_email, profile_pic_link, user_karma_koins, createdAt, updatedAt, GroupId) 
values ("Test User2", "TestUser2@gmail.com", 
'https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/20992971_863919577094100_2869333698020713514_n.jpg?oh=a395c5a818832b77dd754b2cc4ece0e0&oe=5AE9A32A(4 kB)',
100, current_timestamp, current_timestamp,1);

insert into Favors
(favor_name, favor_desc, favor_date, favor_time, favor_asker_id, favor_completer_id, favor_status, favor_price, createdAt, updatedAt, GroupId)
values ( "walk my dog", "Walk my doggie ",current_date, current_time, 1, null,"active",10,current_timestamp, current_timestamp, 1);

insert into Favors
(favor_name, favor_desc,favor_date, favor_time, favor_asker_id, favor_completer_id, favor_status,favor_price, createdAt, updatedAt, GroupId)
values ( "walk my cat", "walk my kitty",current_date, current_time,  2, 1,"complete",15,current_timestamp, current_timestamp, 1);

insert into Favors
(favor_name, favor_desc, favor_date, favor_time, favor_asker_id, favor_completer_id, favor_status, favor_price, createdAt, updatedAt, GroupId)
values ( "Eat ice cream with me", "I want some company", current_date, current_time,  2, null,"active",12,current_timestamp, current_timestamp, 1);




select * from Groups;
select * from Users;
select * from Favors;

