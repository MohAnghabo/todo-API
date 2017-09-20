/**
 * Created by Anghabo on 6/28/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:todoID', (req, res) => {
    var todoID = req.params.todoID;

    if (!ObjectID.isValid(todoID)) {
        res.status(404).send();
    }
    Todo.findById(todoID).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }
        res.send(todo);
    }, (err) => {
        res.status(400).send();
    });
});

app.get('/todos',(req, res) => {
    Todo.find().then((todos)=> {
        res.send({todos});
    }).catch((err) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started at port ${port}`);
});