import {pool} from "../database.js";

const printError = (err) => {
    console.error(err);
    return Promise.reject(err);
};


export function taskCountOnToday() {
    const date = new Date();

    return pool
        .query(`SELECT COUNT(name)
                FROM tasks
                WHERE due_date BETWEEN $1 AND $2`, [date, date])
        .then(res => res.rows[0])
}

export function groupNotCompletedTasksCountByListName() {
    return pool
        .query(`SELECT l.name,
                       COUNT(t.done = false OR null)
                           AS "Not Completed Tasks Count"
                FROM tasks AS t
                         RIGHT JOIN lists AS l ON l.id = t.list_id
                GROUP BY l.name`)
        .then(res => res.rows)
}

export function tasksOnToday() {
    const date = new Date();

    return pool
        .query(`SELECT t.name AS task, l.name AS list
                       FROM tasks AS t
                                LEFT JOIN lists AS l ON l.id = t.list_id
                       WHERE t.due_date BETWEEN $1 AND $2`, [date, date]
    )
        .catch(printError)
        .then(res => res.rows)
}

export function notAllTasksFromList(listId) {
    return pool
        .query(`SELECT * FROM tasks WHERE list_id = $1 AND done = false`,[listId])
        .then(res => res.rows)
}

export function allTasksFromList(listId) {
    return pool
        .query(`SELECT * FROM tasks WHERE list_id = $1`,[listId])
        .then(res => res.rows)
}
