import express, {Router} from "express";
import {createTask, deleteTask, getOneTask, getTasks, supersedeTask, updateTask} from "./task.models.js";

export const taskRoutes = new Router();
taskRoutes.use(express.json());

taskRoutes.post('/tasks', createTaskHandler);
taskRoutes.get('/tasks', getTasksHandler);
taskRoutes.get('/tasks/:id', getOneTaskHandler);
taskRoutes.patch('/tasks/:id', updateTaskHandler);
taskRoutes.delete('/tasks/:id', deleteTaskHandler);
taskRoutes.put('/tasks/:id', supersedeTaskHandler);

function createTaskHandler(req, res) {
    const {name, dueDate, done, description} = req.body;
    createTask(name, dueDate, done, description)
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500));
}

function getTasksHandler(req, res) {
    getTasks()
        .then(tasks => res.json(tasks))
        .catch(() => res.sendStatus(500));
}

function getOneTaskHandler(req, res) {
    const id = req.params.id
    getOneTask(id)
        .then(task => task ? res.json(task) : res.sendStatus(404))
        .catch(() => res.sendStatus(500))
}

function updateTaskHandler(req, res) {
    const id = req.params.id
    getOneTask(id)
        .then(oldTask => Object.assign(oldTask, req.body))
        .then(({name, dueDate, done, description, deleted}) => updateTask(id, name, dueDate, done, description, deleted))
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500))
}

function deleteTaskHandler(req, res) {
    const id = req.params.id
    deleteTask(id)
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500))
}

function supersedeTaskHandler(req, res) {
    const id = req.params.id;
    const done = req.body.done;
    const name = req.body.title || null;
    const due_date = req.body.due_date || null;
    const list_id = req.body.list_id || null;
    const description = req.body.description || null;
    supersedeTask(id, name, due_date, done, list_id, description)
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500))
}