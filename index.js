import express from "express";
import {taskRoutes} from './tasks/task.routes.js';
import {listRoutes} from "./lists/list.routes.js";

const PORT = 3000;

const app = express();

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}

app.use(express.json());
app.use(logRequest)
app.use(listRoutes)
app.use(taskRoutes)

app.listen(PORT, ()=> console.log('Server started on port: ' + PORT ));