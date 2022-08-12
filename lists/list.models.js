import kn from "../knexfile.js";

export function taskCountOnToday() {
    const date = new Date();

    return kn('tasks')
        .count('name')
        .whereBetween('due_date', [date, date])
}

export function groupNotCompletedTasksCountByListName() {

    return kn
        .select('lists.name', 'lists.id')
        .count('tasks.name as undone')
        .where('tasks.done', false)
        .orWhere('tasks.done', null)
        .from('tasks')
        .rightJoin('lists', 'lists.id', 'tasks.list_id')
        .groupBy('lists.name', 'lists.id')
}

export function tasksOnToday() {
    const date = new Date();

    return kn
        .select('tasks.name as task', 'tasks.id as taskId',
            'tasks.done', 'tasks.due_date',
            'lists.name as list', 'lists.id as listId')
        .whereBetween('tasks.due_date', [date, date])
        .from('tasks')
        .leftJoin('lists', 'lists.id','tasks.list_id')
}

export function allTasksFromList(listId, all) {
    return kn
        .select('*')
        .from('tasks')
        .whereIn('list_id', [listId])
        .andWhere('done', false)
        .orWhere('done', all)
}