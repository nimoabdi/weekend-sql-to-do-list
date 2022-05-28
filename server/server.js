const express = require('express');
const bodyParser = require('body-parser');

const taskRouter = require('./public/routes/todo.router');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'))

app.use('/tasks', taskRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});