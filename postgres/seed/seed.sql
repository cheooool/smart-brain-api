BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) values ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');
INSERT INTO login (hash, email) values ('$2a$10$FMyk813WpqUbNGfm6.aW4eeredauZuuL2amPSabKyYV0djmMx556q', 'hi');

COMMIT;