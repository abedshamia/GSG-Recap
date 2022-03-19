BEGIN;

DROP TABLE IF EXISTS users, books, book_user CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INTEGER NOT NULL
);


CREATE TABLE book_user (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);



INSERT INTO users (name, email) VALUES ('John Doe', 'John@doe.com'), ('Jane Doe', 'Jane@doe.com'), ('John Smith', 'John@smith.com'), ('Jane Smith', 'Jane@smith.com');

INSERT INTO books (title, release_year) VALUES ('The Lord of the Rings', 1954), ('The Hobbit', 1937), ('The Catcher in the Rye', 1951), ('The Hunger Games', 2008);


INSERT INTO book_user (user_id, book_id) VALUES (1, 1), (1, 2), (1, 3), (2, 1), (2, 2), (2, 3), (3, 1), (3, 2), (3, 3), (4, 1);

COMMIT;