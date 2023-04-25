//import express from 'express';

//const Router = express.Router(); // can write like this 
import {Router} from 'express';

import { Todo } from '../models/todo';
let todos: Todo[] = []; // we used let here so that we can overwrite todos means for deleting purpose 
const router = Router()           // can also write like this 


type RequestBody = {text: string}
type RequestParams = {todoId: string}

router.get('/', (req,res, next) =>{
res.status(200).json({todos: todos })
})


router.post('/todo',(req, res, next)=>{
  //const body = req.body as {text: string} // before type alias
const body = req.body as RequestBody // after using type alias
const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text
};
todos.push(newTodo);
res.status(200).json({todo: newTodo})
})

router.delete('/deletetodo/:todoId', (req, res, next)=>{
  const params = req.params as RequestParams

 todos = todos.filter(todoItem => todoItem.id !== params.todoId)
 res.status(200).json({message: 'deleted succesfully', todos: todos})
})


router.put('/todo/:todoId', (req, res, next)=>{
    const params = req.params as RequestParams
    const tid = params.todoId
    const body = req.body as RequestBody
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid)
    if(todoIndex >= 0){
      todos[todoIndex] = {id: todos[todoIndex].id , text: req.body.text};
      return res.status(200).json({message: 'updated todo'})
    }
    res.status(400).json({message: 'could not find id '})
})




export default router 