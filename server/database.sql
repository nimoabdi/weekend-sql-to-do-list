CREATE TABLE "to do" (
"id" SERIAL PRIMARY KEY,
"tasks" VARCHAR(50) NOT NULL,
"status" VARCHAR (15) NOT NULL,
"notes" VARCHAR(100)
);

INSERT INTO "to do"
("tasks", "status", "notes")
VALUES
('Take a jog', 'Pending', 'Too lazy for a jog'),
('Clean bedroom', 'Done', 'My room is fianlly clean'),
('Grocery shopping', 'Pending', 'Im broke');

SELECT * FROM "to do";