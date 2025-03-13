-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS RecipeShareApp;
CREATE DATABASE RecipeShareApp;
USE RecipeShareApp;

-- TABLES

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

CREATE TABLE Recipes (
    recipe_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    ingredients TEXT NOT NULL,
    recipe TEXT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
-- muuta ainekset ehkä omaksi taulukoksi? - muista liitäntätaulukko

CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    rating_value INT NOT NULL CHECK (rating_value BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    UNIQUE (user_id, recipe_id)
);

CREATE TABLE Tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL
);

CREATE TABLE RecipeTags (
    recipe_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (recipe_id, tag_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
);


-- SAMPLE DATA

INSERT INTO UserLevels (level_name) VALUES ('Admin'), ('User'), ('Guest');

INSERT INTO Users (username, password, email, user_level_id) VALUES
('JaneSmith', 'to-be-hashed-pw2', 'janesmith@example.com', 3),
('JohnDoe', 'to-be-hashed-pw1', 'johndoe@example.com', 2),
('AdminUser', 'to-be-hashed-pw4', 'adminuser@example.com', 1);

INSERT INTO Recipes (user_id, title, description, ingredients, recipe, filename) 
VALUES 
(2, 'BBQ Ribs', 'Mureat ja herkulliset BBQ-ribsit', 
 '1 kg sian ribsejä, 2 rkl oliiviöljyä, 1 dl BBQ-kastiketta, 2 rkl hunajaa, 1 rkl suolaa, 1 rkl mustapippuria, 1 tl paprikajauhetta, 1 tl valkosipulijauhetta, 1 tl sipulijauhetta, 1/2 tl cayennepippuria', 
 '1. Kuumenna uuni 150 asteeseen. 2. Hiero ribseihin mausteet ja öljy. 3. Aseta ribsit uunipellille ja peitä foliolla. Paista 2-2,5 tuntia. 4. Poista folio ja sivele ribsien päälle BBQ-kastiketta ja hunajaa. Paista vielä 20-30 minuuttia, kunnes ne ovat kauniin karamellisoituneet. 5. Tarjoile ja nauti!', 
 'bbq_ribs.jpg'),

(2, 'Pasta Carbonara', 'Perinteinen italialainen pasta carbonara', 
 '200g pasta, 100g pekonia, 2 kananmunaa, 50g parmesaania, suolaa, mustapippuria', 
 'Keitä pasta suolatussa vedessä. Paista pekoni pannulla. Sekoita kananmunat ja parmesaani. Yhdistä kaikki ainekset ja tarjoile.', 
 'carbonara.jpg'),

(1, 'Suklaakakku', 'Maukas ja mehevä suklaakakku', 
 '200g sokeria, 200g jauhoja, 100g kaakaojauhetta, 3 kananmunaa, 100g voita, 1 dl maitoa', 
 'Sekoita kuivat aineet ja lisää kananmunat, sulatettu voi ja maito. Paista 180 asteessa 30 minuuttia.', 
 'chocolate_cake.jpg');

INSERT INTO Comments (recipe_id, user_id, comment_text) VALUES
(1, 2, 'Kiitos reseptistä. Tämä oli herkullista!'),
(2, 1, 'Käytin maidon sijaan kermaa, ja tuli oivallista!');

-- TRANSAKTIOT
-- Transaktiota voisi käyttää esim. reseptin ja sihen liittyvien tietojen poistamiseen:

-- START TRANSACTION;

-- DELETE FROM Comments WHERE recipe_id = 2;
-- DELETE FROM Likes WHERE recipe_id = 2;
-- DELETE FROM Favorites WHERE recipe_id = 2;
-- DELETE FROM Recipes WHERE recipe_id = 2;

-- COMMIT;


-- VIEWS

-- Käyttäjien reseptien määrä
CREATE VIEW UserRecipeCount AS
SELECT 
    Users.username,
    COUNT(Recipes.recipe_id) AS reseptien_maara
FROM 
    Users
LEFT JOIN 
    Recipes ON Users.user_id = Recipes.user_id
GROUP BY 
    Users.user_id;

-- Reseptin kommentit
CREATE VIEW RecipeComments AS
SELECT 
    Recipes.recipe_id,
    Recipes.title,
    Users.username AS commenter,
    Comments.comment_text,
    Comments.created_at AS comment_date
FROM 
    Recipes
LEFT JOIN 
    Comments ON Recipes.recipe_id = Comments.recipe_id
LEFT JOIN 
    Users ON Comments.user_id = Users.user_id;




---

SELECT * FROM UserRecipeCount;
SELECT * FROM RecipeComments;

---

-- SELECT * FROM Recipes WHERE recipe_id = 1;

CREATE VIEW RecipeDetails AS
SELECT recipe_id, title AS Reseptin_nimi, description, ingredients, recipe, created_at
FROM Recipes;

SELECT * FROM RecipeDetails WHERE recipe_id = 1;

-- SELECT recipe_id, title, description, ingredients, recipe, created_at
-- FROM Recipes
-- WHERE recipe_id = 1;