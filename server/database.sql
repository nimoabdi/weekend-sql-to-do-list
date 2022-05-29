CREATE TABLE "to do" (
"id" SERIAL PRIMARY KEY,
"tasks" VARCHAR(50) NOT NULL,
"status" BOOLEAN
);

SELECT * FROM "to do";