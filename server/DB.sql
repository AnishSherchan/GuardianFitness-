-- ? Creating database name as guardian_fitness
CREATE DATABASE guardian_fitness;
-- ? Creating table for user with all necessary attributes
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(255) NOT NULL,
    account_status VARCHAR(255) NOT NULL
);
-- ? Inserting values inside tbale named as user..
INSERT INTO users (user_name,user_email,user_password,user_role,account_status) VALUES ('Anish','sherchananish11@gmail.com','anish','admin','Active');
-- ? Creating Table User_Info
CREATE TABLE user_info(
    user_id uuid,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    gender VARCHAR(255) NOT NULL,
    DOB DATE NOT NULL,
    weight integer NOT NULL,
    height integer NOT NULL,
    goal VARCHAR(255) NOT NULL,
    neck_size integer,
    shoulder_size integer,
    forearm_size integer,
    biceps_size integer,
    hip_size integer,
    thigh_size integer,
    claves_size integer,
    bmi NUMERIC(5,2)
);