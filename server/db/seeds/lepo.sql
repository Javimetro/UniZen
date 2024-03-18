
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

-- INSERT INTO tips (content, category) VALUES
-- ('It sounds like you’re going through a very tough time. It’s important to know it’s okay to ask for help. Consider reaching out to a trusted friend, family member, or professional.', -5),
-- ('During moments that feel overwhelming, remember that you’re not alone. Support is available to you, and it’s okay to seek it out.', -5),
-- ('Extreme distress can be alarming. If you’re feeling utterly hopeless, please consider contacting a crisis hotline or a healthcare provider who can offer immediate support.', -5);

-- INSERT INTO tips (content, category) VALUES
-- ('When everything feels negative, try to take a moment to breathe deeply and ground yourself in the present. It can sometimes help to manage overwhelming feelings.', -4),
-- ('Acknowledging your feelings is a strength, not a weakness. It’s okay to not be okay, and taking small steps towards self-care is important.', -4),
-- ('Writing down what you’re feeling can be a cathartic way to deal with heavy emotions. Consider journaling as a way to express what’s on your mind.', -4);

-- INSERT INTO tips (content, category) VALUES
-- ('Sometimes, engaging in a small activity that you enjoy, like listening to your favorite music or taking a walk, can offer a brief respite from negative feelings.', -3),
-- ('Connecting with nature, even if it’s just spending a few minutes outside, can sometimes help improve your mood when you’re feeling down.', -3),
-- ('Doing something kind for someone else, even something small, can sometimes help you feel a little better when you’re struggling with negative emotions.', -3);

-- INSERT INTO tips (content, category) VALUES
-- ('When faced with challenges, try to find one small thing that you’re grateful for. Gratitude can sometimes help shift your perspective.', -2),
-- ('Exercise, even a short walk, can sometimes help lift your mood. Consider moving your body in a way that feels good to you.', -2),
-- ('Connecting with friends or loved ones, even if it’s just a quick message or call, can often provide comfort and improve your mood.', -2);

-- INSERT INTO tips (content, category) VALUES
-- ('Reflect on your achievements, no matter how small they may seem. Recognizing your own successes can help combat feelings of negativity.', -1),
-- ('Consider setting a small, achievable goal for the day. Accomplishing it can provide a sense of satisfaction and improve your mood.', -1),
-- ('Finding humor in everyday situations can sometimes lighten your mood. Look for moments or things that make you smile or laugh.', -1);

-- INSERT INTO tips (content, category) VALUES
-- ('Neutral days can be a canvas for something new. Is there something different you’d like to try today?', 0),
-- ('Finding balance is an art. Reflect on what balance means to you and how you might achieve or maintain it in your daily life.', 0),
-- ('A neutral state is a great time for self-reflection. Consider spending a few moments contemplating your recent experiences and future goals.', 0),
-- ('Sometimes, being neutral is just what we need. Consider taking this time to relax, recharge, and enjoy the moment of calm.', 0),
-- ('Neutral feelings can provide a clear perspective. It might be a good time to organize your thoughts or plan for the upcoming days.', 0);

-- INSERT INTO tips (content, category) VALUES
-- ('Taking a moment to savor the small pleasures in life can enhance your sense of well-being. What’s something small that made you smile today?', 1),
-- ('Practicing mindfulness can deepen your positive experiences. Try focusing fully on one enjoyable activity today without distractions.', 1),
-- ('A moment of gratitude can turn a good day into a great one. Consider jotting down one thing you’re grateful for today.', 1);

-- INSERT INTO tips (content, category) VALUES
-- ('Positive vibes are contagious. Share your good mood with others through a kind word or deed.', 2),
-- ('Building on your positive mood can lead to new opportunities. Consider trying something new today that you’ve been curious about.', 2),
-- ('Positive moments are worth celebrating, no matter how small. Treat yourself to something you enjoy as a way to acknowledge your good day.', 2);

-- INSERT INTO tips (content, category) VALUES
-- ('Your positive energy has the power to brighten not just your day but also others’. Consider how you might spread this positivity around.', 3),
-- ('Feeling good is a great opportunity to set new goals or revisit old ones. What’s something positive you’d like to work towards?', 3),
-- ('Maintaining a positive outlook can be reinforced by positive actions. Think of a good habit you might start or continue to build on this positive momentum.', 3);

-- INSERT INTO tips (content, category) VALUES
-- ('When you’re feeling great, your potential to make a positive impact is immense. Consider how you might use your energy to help others today.', 4),
-- ('Your joy can be a beacon of hope and inspiration. Think of a way to share your story or positive outlook with someone who might need it.', 4),
-- ('Feeling fantastic is a wonderful state to be in. Capture this feeling by journaling or engaging in creative expression to remember and revisit later.', 4);

-- INSERT INTO tips (content, category) VALUES
-- ('Extraordinary days are rare and special. Consider commemorating today in a way that feels meaningful to you.', 5),
-- ('Your highest levels of positivity can be transformative. Think big—what’s a dream or aspiration you can take a step towards today?', 5),
-- ('On top of the world? It’s a great time to give back and uplift others. Look for opportunities to make a positive difference in your community.', 5);



