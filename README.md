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

insert into Groups (group_name, group_leader, createdAt, updatedAt) 
values ("Test Group", 1,
current_timestamp, current_timestamp);


insert into Users 
(user_name, user_email, user_karma_koins,createdAt, updatedAt, GroupId) 
values ("Test User1", "TestUser1@gmail.com", 100, current_timestamp, current_timestamp,1);

insert into Users 
(user_name, user_email, user_karma_koins, createdAt, updatedAt, GroupId) 
values ("Test User2", "TestUser2@gmail.com", 100, current_timestamp, current_timestamp,1);

insert into Favors
(favor_name, favor_desc, favor_asker_id, favor_completer_id, favor_status, favor_price, createdAt, updatedAt, GroupId)
values ( "walk my dog", "Walk my doggie ",1, null,"active",10,current_timestamp, current_timestamp, 1);

insert into Favors
(favor_name, favor_desc, favor_asker_id, favor_completer_id, favor_status,favor_price, createdAt, updatedAt, GroupId)
values ( "walk my cat", "walk my kitty", 2, 1,"complete",15,current_timestamp, current_timestamp, 1);

insert into Favors
(favor_name, favor_desc, favor_asker_id, favor_completer_id, favor_status, favor_price, createdAt, updatedAt, GroupId)
values ( "Eat ice cream with me", "I want some company", 2, null,"active",12,current_timestamp, current_timestamp, 1);


select * from Groups;
select * from Users;
select * from Favors;

