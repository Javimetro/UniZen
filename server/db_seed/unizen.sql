DROP DATABASE unizen;

CREATE DATABASE unizen;

USE unizen;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    sub VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    signup_date DATE NOT NULL
);

 CREATE TABLE measurements (
    measurement_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    timestamp TIMESTAMP NOT NULL,
    artefact INT,
    artefact_level VARCHAR(50),
    mean_hr_bpm DECIMAL(10, 2),
    mean_rr_ms DECIMAL(10, 2),
    pns_index DECIMAL(10, 2),
    readiness DECIMAL(10, 2),
    rmssd_ms DECIMAL(10, 2),
    sd1_ms DECIMAL(10, 2),
    sd2_ms DECIMAL(10, 2),
    sdnn_ms DECIMAL(10, 2),
    sns_index DECIMAL(10, 2),
    stress_index DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

 CREATE TABLE calendar (
    summary_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    Date DATE NOT NULL,
    color_code VARCHAR(10),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

 CREATE TABLE tips (
    tip_id INT PRIMARY KEY AUTO_INCREMENT,
    color VARCHAR(10),
    tip_text TEXT
);


USE unizen;

INSERT INTO tips (color, tip_text) VALUES
('Red', 'You might be feeling overwhelmed. Consider taking a break and focusing on relaxation.'),
('Red', 'High stress detected. Deep breathing or a short walk could help you reset.'),
('Red', 'Sometimes it pays to think more about yourself and take a break. call a friend and enjoy their company.'),
('Yellow', 'You are doing okay, but there''s room for improvement. Try some light exercise or mindfulness.'),
('Green', 'Great job on maintaining balance! Keep up with your healthy habits.');
