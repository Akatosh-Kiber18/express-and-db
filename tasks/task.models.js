import {pool} from "../database.js";

export function getTasks() {
    return pool
        .query('SELECT * FROM tasks')
        .then(res => res.rows);
}

export function createTask(name, done) {
    return pool
        .query('INSERT INTO public.tasks(name, done) VALUES ($1, $2) RETURNING id, name, done', [name, done])
        .then((res) => res.rows[0]);
}

export function getOneTask(id) {
    return pool
        .query('SELECT * FROM tasks WHERE id = $1', [id])
        .then(res => res.rows[0]);
}

export function updateTask(id, name, done) {
    return pool
        .query('UPDATE public.tasks SET name=$2, done=$3 WHERE id = $1 RETURNING id, name, done', [id, name, done])
        .then((res) => res.rows[0]);
}


export function deleteTask(id) {
    return pool
        .query('DELETE FROM public.tasks WHERE id = $1 ', [id])
        .then(res => res.rows[0]);
}

export function supersedeTask(id, name, done) {
    return pool
        .query('UPDATE public.tasks SET name=$2, done=$3 WHERE id = $1 RETURNING id, name, done', [id, name, done])
        .then((res) => res.rows[0]);
}