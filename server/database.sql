CREATE TABLE "todos" (
"id" SERIAL PRIMARY KEY,
"tasks" VARCHAR(250) NOT NULL,
"status" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todos"
("tasks")
VALUES
('Take a jog'),
('Clean bedroom'),
('Grocery shopping');

SELECT * FROM "todos";