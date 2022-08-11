import kn from '../knexfile.js'

import {pool} from "../database.js";

const printError = (err) => {
    console.error(err);
    return Promise.reject(err);
};

export function getTasks() {
    return kn.select('*')
        .from('tasks')
}

export function createTask(name, due_date, done, list_id, description) {
    return pool
        .query(`INSERT INTO public.tasks(name, due_date, done, list_id, description)
                VALUES ($1, $2, $3, $4, $5) RETURNING id, name, due_date, done, list_id, description`,
            [name, due_date, done, list_id, description])
        .catch(printError)
        .then((res) => res.rows[0]);
}

export function getOneTask(id) {
    return pool
        .query('SELECT * FROM tasks WHERE id = $1', [id])
        .catch(printError)
        .then(res => res.rows[0]);
}

export function updateTask(id, name, due_date, done, list_id, description) {
    return pool
        .query(`UPDATE public.tasks
                SET name=$2,
                    due_date=$3,
                    done=$4,
                    list_id=$5,
                    description=$6
                WHERE id = $1 RETURNING id, name, due_date, done, list_id, description`,
            [id, name, due_date, done, list_id, description])
        .catch(printError)
        .then((res) => res.rows[0]);
}


export function deleteTask(id) {
    return pool
        .query('DELETE FROM public.tasks WHERE id = $1 ', [id])
        .catch(printError)
        .then(res => res.rows[0]);
}

export function supersedeTask(id, name, due_date, done, list_id, description) {
    return pool
        .query(`UPDATE public.tasks
                SET name=$2,
                    due_date=$3,
                    done=$4,
                    list_id=$5,
                    description=$6
                WHERE id = $1 RETURNING id, name, due_date, done, list_id, description`,
            [id, name, due_date, done, list_id, description])
        .catch(printError)
        .then((res) => res.rows[0]);
}