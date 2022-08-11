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
    const {name, due_date, done, list_id, description} = req.body;
    createTask(name, due_date, done, list_id, description)
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
        .then(({name, due_date, done, list_id, description}) => updateTask(id, name, due_date, done, list_id, description))
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
    const {name, due_date, done, list_id, description} = req.body;
    supersedeTask(id, name, due_date, done, list_id, description)
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500))
}