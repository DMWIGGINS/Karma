DROP DATABASE IF EXISTS KarmaKoins_DB;
CREATE DATABASE KarmaKoins_DB;
USE KarmaKoins_DB;
CREATE TABLE KarmaGroup(
  group_id INT NOT NULL AUTO_INCREMENT,
  group_name VARCHAR(100) NOT NULL,
  people_assigned VARCHAR(45) NOT NULL,
  group_leader INT default 0,
  PRIMARY KEY (group_id)
);
CREATE TABLE KamraPeople(
  user_id INT NOT NULL AUTO_INCREMENT,
  username_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(45) NOT NULL,
  group_id INT,
  total_karmakoins INT,
  PRIMARY KEY (user_id),
  FOREIGN KEY (group_id) references KarmaGroup (group_id)
);
CREATE TABLE Favors(
  favor_id INT NOT NULL AUTO_INCREMENT,
  favor_description VARCHAR(500) NOT NULL,
  favor_asker VARCHAR(100) NOT NULL,
  favor_completer VARCHAR(100) NOT NULL,
  favor_status VARCHAR (100) NOT NULL,
  PRIMARY KEY (favor_id),
  karma_price INT
);