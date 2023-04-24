"use strict";
//import express from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
//const Router = express.Router(); // can write like this 
const express_1 = require("express");
let todos = []; // we used let here so that we can overwrite todos means for deleting purpose 
const router = (0, express_1.Router)(); // can also write like this 
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(200).json({ todo: newTodo });
});
router.delete('/deletetodo/:todoId', (req, res, next) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);
    res.status(200).json({ message: 'deleted succesfully', todos: todos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'updated todo' });
    }
    res.status(400).json({ message: 'could not find id ' });
});
exports.default = router;
