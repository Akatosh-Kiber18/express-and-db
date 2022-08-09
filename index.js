import express from "express";
import {router} from './tasks/task.routes.js';

const PORT = 3000;

const app = express();

app.use(router)

app.listen(PORT, ()=> console.log('Server started on port: ' + PORT ));