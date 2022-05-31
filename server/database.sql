CREATE TABLE "todos" (
"id" SERIAL PRIMARY KEY,
"tasks" VARCHAR(250) NOT NULL,
"status" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todos"
("tasks", "status")
VALUES
('Take a jog', false),
('Clean bedroom', false),
('Grocery shopping', false);

SELECT * FROM "todos";