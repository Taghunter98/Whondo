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
    kID INT NOT NULL UNIQUE AUTO_INCREMENT,
    house BOOLEAN DEFAULT 0,
    flat BOOLEAN DEFAULT 0,
    bungalow BOOLEAN DEFAULT 0,
    studio BOOLEAN DEFAULT 0,
    bedsit BOOLEAN DEFAULT 0,
    maisonette BOOLEAN DEFAULT 0,
    shared_house BOOLEAN DEFAULT 0,
    student_accommodation BOOLEAN DEFAULT 0,
    en_suite BOOLEAN DEFAULT 0,
    penthouse BOOLEAN DEFAULT 0,
    furnished BOOLEAN DEFAULT 0,
    unfurnished BOOLEAN DEFAULT 0,
    bills_included BOOLEAN DEFAULT 0,
    all_inclusive BOOLEAN DEFAULT 0,
    double_room BOOLEAN DEFAULT 0,
    single_room BOOLEAN DEFAULT 0,
    balcony BOOLEAN DEFAULT 0,
    garden BOOLEAN DEFAULT 0,
    parking BOOLEAN DEFAULT 0,
    pets_allowed BOOLEAN DEFAULT 0,
    pet_friendly BOOLEAN DEFAULT 0,
    wifi_included BOOLEAN DEFAULT 0,
    utilities_included BOOLEAN DEFAULT 0,
    short_let BOOLEAN DEFAULT 0,
    long_let BOOLEAN DEFAULT 0,
    no_deposit BOOLEAN DEFAULT 0,
    low_deposit BOOLEAN DEFAULT 0,
    zero_deposit BOOLEAN DEFAULT 0,
    dss_accepted BOOLEAN DEFAULT 0,
    guarantor_required BOOLEAN DEFAULT 0,
    no_guarantor BOOLEAN DEFAULT 0,
    student_friendly BOOLEAN DEFAULT 0,
    city_centre BOOLEAN DEFAULT 0,
    near_university BOOLEAN DEFAULT 0,
    close_to_station BOOLEAN DEFAULT 0,
    bus_route BOOLEAN DEFAULT 0,
    zone_1 BOOLEAN DEFAULT 0,
    zone_2 BOOLEAN DEFAULT 0,
    zone_3 BOOLEAN DEFAULT 0,
    zone_4 BOOLEAN DEFAULT 0,
    cycle_friendly BOOLEAN DEFAULT 0,
    LGBTQ_friendly BOOLEAN DEFAULT 0,
    vegan_household BOOLEAN DEFAULT 0,
    non_smoking BOOLEAN DEFAULT 0,
    smoking_allowed BOOLEAN DEFAULT 0,
    social_house BOOLEAN DEFAULT 0,
    quiet_house BOOLEAN DEFAULT 0,
    wheelchair_accessible BOOLEAN DEFAULT 0,
    lift BOOLEAN DEFAULT 0,
    ground_floor BOOLEAN DEFAULT 0,
    bike_storage BOOLEAN DEFAULT 0,
    PRIMARY KEY (kID)
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
    lID INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price FLOAT,
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
    FOREIGN KEY (lID) REFERENCES Landlords ON DELETE CASCADE
);

ALTER TABLE Adverts AUTO_INCREMENT=100;

CREATE TABLE PropertyKeywordAdvert (
    lID INT NOT NULL,
    pID INT UNIQUE NOT NULL,
    kID INT UNIQUE NOT NULL,
    PRIMARY KEY (lID, pID, kID),
    FOREIGN KEY (lID) REFERENCES Landlords ON DELETE CASCADE,
    FOREIGN KEY (kID) REFERENCES Keywords ON DELETE CASCADE,
    FOREIGN KEY (pID) REFERENCES Property ON DELETE CASCADE
);