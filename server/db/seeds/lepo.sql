
USE Lepo;
/*
-- Create Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_level INT DEFAULT 2
);

-- Create Entries Table
CREATE TABLE entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    entry_date DATE,
    text TEXT,
    energy_level INT,  -- Placeholder for future use
    sleep_hours INT,  -- Placeholder for future use
    sentiment_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Tips Table
CREATE TABLE tips (
    tip_id INT AUTO_INCREMENT PRIMARY KEY,
    entry_id INT,
    content TEXT,
    FOREIGN KEY (entry_id) REFERENCES Entries(entry_id)
); */

INSERT INTO Users (username, password, email, user_level)
VALUES
('user1', 'hashed_password1', 'user1@example.com', 2),
('user2', 'hashed_password2', 'user2@example.com', 2),
('admin', 'hashed_password_admin', 'admin@example.com', 1);

INSERT INTO Entries (user_id, entry_date, text, energy_level, sleep_hours, sentiment_score)
VALUES
(1, '2024-03-15', 'Had a great day today, everything went well!', NULL, NULL, 0.8),
(2, '2024-03-15', 'Feeling stressed about the upcoming exams.', NULL, NULL, -0.5),
(1, '2024-03-16', 'Not feeling well, stayed in bed most of the day.', NULL, NULL, -0.8);

INSERT INTO Tips (entry_id, content)
VALUES
(1, 'Keep up the positive vibes! Consider jotting down what made your day great.'),
(2, 'Try breaking down your study material into manageable chunks.'),
(3, 'Rest is important, especially when you''re not feeling well. Make sure to stay hydrated.');

