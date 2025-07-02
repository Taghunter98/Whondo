-- Whondo Database Schema
-- Copyright (c) Josh Bassett, www.whondo.com 2025
--
-- Author:  Josh Bassett
-- Updated: 02/06/2025

CREATE TABLE Users (
    uID INT UNIQUE NOT NULL AUTO_INCREMENT,    
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    occupation VARCHAR(255),
    bio TEXT,
    profilePicture VARCHAR(255),
    verified BOOLEAN,
    PRIMARY KEY (uID)
);

ALTER TABLE Users AUTO_INCREMENT=100;

CREATE TABLE Landlords (
    lID INT UNIQUE NOT NULL AUTO_INCREMENT,
    uID INT UNIQUE NOT NULL,
    PRIMARY KEY (lID),
    FOREIGN KEY (uID) REFERENCES Users ON DELETE CASCADE
);

ALTER TABLE Landlords AUTO_INCREMENT=100;

CREATE TABLE Tenants (
    tID INT UNIQUE NOT NULL AUTO_INCREMENT,
    uID INT UNIQUE NOT NULL,
    PRIMARY KEY (tID),
    FOREIGN KEY (uID) REFERENCES Users ON DELETE CASCADE
);

ALTER TABLE Tenants AUTO_INCREMENT=100;

CREATE TABLE Codes (
    code INT NOT NULL,
    uID INT UNIQUE NOT NULL,
    lifetime DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (uID, lifetime),
    FOREIGN KEY (uID) REFERENCES Users ON DELETE CASCADE 
);

CREATE TABLE Property (
    pID INT UNIQUE NOT NULL AUTO_INCREMENT,
    propType VARCHAR(255) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    town VARCHAR(255) NOT NULL,
    county VARCHAR(255) NOT NULL,
    postcode CHAR(10),
    lID INT UNIQUE NOT NULL,
    PRIMARY KEY (pID),
    FOREIGN KEY (lID) REFERENCES Landlords ON DELETE CASCADE
);

ALTER TABLE Property AUTO_INCREMENT=100;

CREATE TABLE Keywords (
    kID INT PRIMARY KEY AUTO_INCREMENT,
    house BOOLEAN,
    flat BOOLEAN,
    bungalow BOOLEAN,
    studio BOOLEAN,
    bedsit BOOLEAN,
    maisonette BOOLEAN,
    shared_house BOOLEAN,
    student_accommodation BOOLEAN,
    en_suite BOOLEAN,
    penthouse BOOLEAN,
    furnished BOOLEAN,
    unfurnished BOOLEAN,
    bills_included BOOLEAN,
    all_inclusive BOOLEAN,
    double_room BOOLEAN,
    single_room BOOLEAN,
    balcony BOOLEAN,
    garden BOOLEAN,
    parking BOOLEAN,
    pets_allowed BOOLEAN,
    pet_friendly BOOLEAN,
    wifi_included BOOLEAN,
    utilities_included BOOLEAN,
    short_let BOOLEAN,
    long_let BOOLEAN,
    no_deposit BOOLEAN,
    low_deposit BOOLEAN,
    zero_deposit BOOLEAN,
    dss_accepted BOOLEAN,
    guarantor_required BOOLEAN,
    no_guarantor BOOLEAN,
    student_friendly BOOLEAN,
    city_centre BOOLEAN,
    near_university BOOLEAN,
    close_to_station BOOLEAN,
    bus_route BOOLEAN,
    zone_1 BOOLEAN,
    zone_2 BOOLEAN,
    zone_3 BOOLEAN,
    zone_4 BOOLEAN,
    cycle_friendly BOOLEAN,
    LGBTQ_friendly BOOLEAN,
    vegan_household BOOLEAN,
    non_smoking BOOLEAN,
    smoking_allowed BOOLEAN,
    social_house BOOLEAN,
    quiet_house BOOLEAN,
    wheelchair_accessible BOOLEAN,
    lift BOOLEAN,
    ground_floor BOOLEAN,
    bike_storage BOOLEAN
);

ALTER TABLE Keywords AUTO_INCREMENT=100;

-- Fix this later add on delete cascade
CREATE TABLE APIKeys (
    aID INT UNIQUE NOT NULL AUTO_INCREMENT,
    uID INT UNIQUE NOT NULL,
    apiKey VARCHAR(255) NOT NULL,
    PRIMARY KEY (aID),
    FOREIGN KEY (uID) REFERENCES Users
);

ALTER TABLE APIKeys AUTO_INCREMENT=100;

CREATE TABLE Adverts (
    adID INT UNIQUE NOT NULL AUTO_INCREMENT,
    lID INT UNIQUE NOT NULL,
    kID INT UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tennants INT,
    image1 VARCHAR(255),
    image2 VARCHAR(255),
    image3 VARCHAR(255),
    image4 VARCHAR(255),
    image5 VARCHAR(255),
    image6 VARCHAR(255),
    image7 VARCHAR(255),
    image8 VARCHAR(255),
    image9 VARCHAR(255),
    image10 VARCHAR(255),
    PRIMARY KEY (adID),
    FOREIGN KEY (lID) REFERENCES Landlords,
    FOREIGN KEY (kID) REFERENCES Keywords
);

ALTER TABLE Adverts AUTO_INCREMENT=100;