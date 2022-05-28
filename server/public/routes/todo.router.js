const express = require('express');
const pool = require('../modules/pool')
const taskRouter = express.Router();
// database connection

// GET

taskRouter.get('/', (req, res) => {{
    const sqlQuery = `
        SELECT * FROM "to do"
        ORDER BY "tasks" ASC
    `;

    pool.query(sqlQuery)
        .then((dbRes) => {
            console.log('DB request success', dbRes.rows);
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log(`DB request failed`, err);

            res.sendStatus(500);
        });
}})


//POST



// PUT



// DELETE

module.exports = taskRouter;