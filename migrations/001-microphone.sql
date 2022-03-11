-- Up
CREATE TABLE microphone (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT,
    price INTEGER,
    imageUrl TEXT
);
INSERT INTO Microphone (brand, mode, price, imageUrl)
VALUES ('Blue', 'Amber', 99.99, '');
INSERT INTO Microphone (brand, mode, price, imageUrl)
VALUES ('Red', 'Amber', 99.99, '');
INSERT INTO Microphone (brand, mode, price, imageUrl)
VALUES ('Green', 'Amber', 99.99, '');
INSERT INTO Microphone (brand, mode, price, imageUrl)
VALUES ('Black', 'Amber', 99.99, '');
-- Down
DROP TABLE microphone;