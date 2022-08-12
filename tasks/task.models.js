import kn from '../knexfile.js'

import {pool} from "../database.js";

const printError = (err) => {
    console.error(err);
    return Promise.reject(err);
};

export function getTasks() {
    return kn
        .select('*')
        .from('tasks')
}

export function createTask(name, due_date, done, list_id, description) {//TODO
    return kn('tasks')
        .insert({name, due_date, done, list_id, description})
        .returning('*')
}

export function getOneTask(id) {
    return pool
        .query('SELECT * FROM tasks WHERE id = $1', [id])
        .catch(printError)
        .then(res => res.rows[0]);
}

export function updateTask(id, name, due_date, done, list_id, description) {//TODO
    return kn('tasks')
        .whereIn('id', [id])
        .update({name, due_date, done, list_id, description})
        .returning('*')
}


export function deleteTask(id) {
    return pool
        .query(`DELETE FROM public.tasks WHERE id = $1 RETURNING *`, [id])
        .catch(printError)
        .then(res => res.rows[0]);
}

export function supersedeTask(id, name, due_date, done, list_id, description) {
    // return kn('tasks')
    //     .whereIn('id', [id])
    //     .update({name, due_date, done, list_id, description})
    //     .returning('*')

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