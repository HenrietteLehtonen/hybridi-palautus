-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS MediaShare;
CREATE DATABASE MediaShare;
USE MediaShare;

-- Create the tables

CREATE TABLE UserLevels (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(50) NOT NULL
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_level_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
);

CREATE TABLE MediaItems (
    media_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    filesize INT NOT NULL,
    media_type VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    rating_value INT NOT NULL CHECK (rating_value BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL
);

CREATE TABLE MediaItemTags (
    media_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (media_id, tag_id),
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
);

-- VIEWS / Näkymät aina taulujen luonnin jälkeen

CREATE VIEW UserContactInfo AS
    SELECT username, email
    FROM Users;

CREATE VIEW MediaItemDetails AS
    SELECT MediaItems.media_id, MediaItems.title, Users.username
    FROM MediaItems
    JOIN Users ON MediaItems.user_id = Users.user_id;

CREATE VIEW UserMediaCount AS
  SELECT Users.user_id, Users.username, COUNT(MediaItems.media_id) AS MediaCount
  FROM Users
  LEFT JOIN MediaItems ON Users.user_id = MediaItems.user_id
  GROUP BY Users.user_id;


-- view with media and comments on media

-- CREATE VIEW CommentsOnMedia AS
--     SELECT Users.username, MediaItems.media.title, Comments.comment_text
--     FROM MediaItems
--     JOIN Users ON MediaItems.user_id = Users.user_id;
    
-- Insert the sample data

INSERT INTO UserLevels (level_name) VALUES ('Admin'), ('User'), ('Guest');

INSERT INTO Users (username, password, email, user_level_id) VALUES
('JohnDoe', 'to-be-hashed-pw1', 'johndoe@example.com', 2),
('JaneSmith', 'to-be-hashed-pw2', 'janesmith@example.com', 2),
('Anon5468', 'to-be-hashed-pw3', 'anon5468@example.com', 2),
('AdminUser', 'to-be-hashed-pw4', 'adminuser@example.com', 1);

INSERT INTO MediaItems (user_id, filename, filesize, media_type, title, description) VALUES
(1, 'sunset.jpg', 1024, 'image/jpeg', 'Sunset', 'A beautiful sunset'),
(2, 'sample.mp4', 20480, 'video/mp4', 'Sample Video', 'A sample video file'),
(2, 'ffd8.jpg', 2048, 'image/jpeg', 'Favorite food', null),
(1, '2f9b.jpg', 1024, 'image/jpeg', 'Aksux and Jane', 'friends');

INSERT INTO Comments (media_id, user_id, comment_text) VALUES
(1, 2, 'This is a wonderful photo!'),
(2, 1, 'Really nice video, thanks for sharing!');

INSERT INTO Likes (media_id, user_id) VALUES
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(2, 3),
(3, 3);

INSERT INTO Ratings (media_id, user_id, rating_value) VALUES
(1, 2, 5),
(2, 1, 4),
(1, 3, 4);

INSERT INTO Tags (tag_name) VALUES ('Nature'), ('Video'), ('Documentary'), ('Landscape');

INSERT INTO MediaItemTags (media_id, tag_id) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 1),
(2, 3);

-- KYSELYT 

SELECT * FROM UserContactInfo;
SELECT * FROM MediaItemDetails;
SELECT * FROM UserMediaCount;