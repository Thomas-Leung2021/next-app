-- Up
CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    password TEXT
);

CREATE TABLE Vehicle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT,
    ownerId INTEGER REFERENCES Person(id)
);

-- INSERT INTO Person (name, email) VALUES ('John Doe', 'john@gmail.com');
-- INSERT INTO Person (name, email) VALUES ('Jane Doe', 'jane@gmail.com');

-- INSERT INTO Vehicle (brand, model, ownerId) VALUES ('Ford', 'Focus', 1);
-- INSERT INTO Vehicle (brand, model, ownerId) VALUES ('Ford', 'Fiesta', 1);
-- INSERT INTO Vehicle (brand, model, ownerId) VALUES ('Ford', 'Fusion', 2);

-- Down
DROP TABLE Person;
DROP TABLE Vehicle;