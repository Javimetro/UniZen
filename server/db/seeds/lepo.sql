
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

-- INSERT INTO Users (username, password, email, user_level)
-- VALUES
-- ('user1', 'hashed_password1', 'user1@example.com', 2),
-- ('user2', 'hashed_password2', 'user2@example.com', 2),
-- ('admin', 'hashed_password_admin', 'admin@example.com', 1);

-- INSERT INTO Entries (user_id, entry_date, text, energy_level, sleep_hours, sentiment_score)
-- VALUES
-- (1, '2024-03-15', 'Had a great day today, everything went well!', NULL, NULL, 0.8),
-- (2, '2024-03-15', 'Feeling stressed about the upcoming exams.', NULL, NULL, -0.5),
-- (1, '2024-03-16', 'Not feeling well, stayed in bed most of the day.', NULL, NULL, -0.8);

-- INSERT INTO Tips (entry_id, content)
-- VALUES
-- (1, 'Keep up the positive vibes! Consider jotting down what made your day great.'),
-- (2, 'Try breaking down your study material into manageable chunks.'),
-- (3, 'Rest is important, especially when you''re not feeling well. Make sure to stay hydrated.');

-- CREATE TABLE tips (
--     tip_id INT AUTO_INCREMENT PRIMARY KEY,
--     content TEXT,
--     category INT
-- );

-- Tips for very low sentiment (category 1)
INSERT INTO tips (content, category) VALUES
('It’s okay to feel down. Consider talking to a friend or loved one about your feelings.', 1),
('Taking a moment for some deep breaths can be surprisingly refreshing.', 1),
('Remember, it’s okay to seek professional help. You’re not alone.', 1);

-- Tips for low sentiment (category 2)
INSERT INTO tips (content, category) VALUES
('Everyone has tough days. How about a short walk to clear your mind?', 2),
('Writing down three things you’re grateful for might shift your perspective.', 2),
('Try to focus on small wins or positive aspects of your day.', 2);

-- Tips for neutral sentiment (category 3)
INSERT INTO tips (content, category) VALUES
('Maintaining balance is key. Keep doing what works for you.', 3),
('Reflecting on your day can provide insights into what brings you balance.', 3),
('How about trying something new today? It could be a new hobby or a simple change in routine.', 3);

-- Tips for slightly positive sentiment (category 4)
INSERT INTO tips (content, category) VALUES
('Your positivity is inspiring! How about sharing your positive energy with others?', 4),
('A positive mindset can be contagious. Keep spreading the good vibes!', 4),
('You seem to be on a good track. Remember to cherish these moments of positivity.', 4);

-- Tips for positive sentiment (category 5)
INSERT INTO tips (content, category) VALUES
('Great job on maintaining a positive outlook! Consider setting a new goal to keep the momentum.', 5),
('Your positive energy is a powerful asset. Use it to tackle new challenges.', 5),
('Why not pay it forward? Your positivity could help lift someone else’s spirits today.', 5);



