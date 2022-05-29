const express = require('express');
const pool = require('../modules/pool')
const taskRouter = express.Router();
// database connection

// GET

taskRouter.get('/', (req, res) => {{
    const sqlQuery = `
        SELECT * FROM "todos"
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
}});


//POST
taskRouter.post('/', (req, res) =>{
    let upTask = req.body;
    console.log('adds new task', upTask);


    const sqlQuery = `
    INSERT INTO "todos" ("tasks")
        
    VALUES
        ($1);
`; 
const sqlParams = [
    req.body.tasks,        
    req.body.status          
];
console.log(sqlQuery);

pool.query(sqlQuery, sqlParams)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`POST to db failed: ${err}`);
            res.sendStatus(500);
        });

});


// PUT

taskRouter.put('/:id', (req, res) => {
    let taskId = req.params.id;
    console.log('complete request for id', taskId);

    let doneWithTask = req.body.doneWithTask;
    console.log('task status', doneWithTask);

    let statusTask;
    if(doneWithTask === 'true'){
        statusTask = false;
    }
    else{
        statusTask= true;
    }
    console.log('task status', statusTask);

    const sqlQuery = `
    UPDATE "todos"
    SET "status" = $2
    WHERE id = $1;
    `

    const sqlParams = [
        taskId,
        statusTask
    ];

    pool.query(sqlQuery, sqlParams)
    .then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        console.log('put failed', err);

        res.sendStatus(500);
    });


})

// DELETE

taskRouter.delete('/:id', (req, res) => {
    let taskId = req.params.id;
    console.log('Delete request for id', taskId);

    let sqlQuery = `
    DELETE FROM "todos" 
    WHERE "id" = $1;
    `;
    const sqlParams = [
        taskId,             
    ];

    pool.query(sqlQuery, sqlParams)
    .then(() => {
      console.log('task deleted');
      res.sendStatus(204);
    })
    .catch( (error) => {
      console.log('error in database', error);
      res.sendStatus(500); 
    })

})

module.exports = taskRouter;