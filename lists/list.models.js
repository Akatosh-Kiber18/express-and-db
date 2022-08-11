import kn from "../knexfile.js";

const printError = (err) => {
    console.error(err);
    return Promise.reject(err);
};

export function taskCountOnToday() {
    const date = new Date();

    return kn('tasks')
        .count('name')
        .whereBetween('due_date', [date, date])
}

export function groupNotCompletedTasksCountByListName() {

    return kn
        .select('lists.name')
        .count('tasks.name')
        .whereIn('tasks.done', [false])
        .from('tasks')
        .rightJoin('lists', 'lists.id', 'tasks.list_id')
        .groupBy('lists.name')
}

export function tasksOnToday() {
    const date = new Date();

    return kn
        .select('tasks.name as task', 'lists.name as list')
        .whereBetween('tasks.due_date', [date, date])
        .from('tasks')
        .leftJoin('lists', 'lists.id','tasks.list_id')

}

export function notAllTasksFromList(listId) {
    return kn
        .select('*')
        .from('tasks')
        .whereIn('list_id', [listId])
        .andWhere('done', false)
}

export function allTasksFromList(listId) {
    return kn
        .select('*')
        .from('tasks')
        .whereIn('list_id', [listId])
}
