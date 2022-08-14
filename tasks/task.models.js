import kn from '../knexfile.js'

const printError = (err) => {
    console.error(err);
    return Promise.reject(err);
};

export function getTasks() {
    return kn
        .select('*')
        .from('tasks')
}

export function createTask(name, due_date, done, list_id, description) {
    return kn('tasks')
        .insert({name, due_date, done, list_id, description})
        .returning('*')
}

export function getOneTask(id) {
    return kn
        .select('*')
        .from('tasks')
        .whereIn('id',[id])
}

export function updateTask(id, name, due_date, done, list_id, description) {
    return kn('tasks')
        .whereIn('id', [id])
        .update({name, due_date, done, list_id, description})
        .returning('*')
}


export function deleteTask(id) {
    return kn('tasks')
        .whereIn('id', [id])
        .del("*")
}

export function supersedeTask(id, name, due_date, done, list_id, description) {
    return kn('tasks')
        .whereIn('id', [id])
        .update({name, due_date, done, list_id, description})
        .returning('*')
}