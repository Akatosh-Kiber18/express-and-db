import {Router} from "express"
import {
    taskCountOnToday,
    groupNotCompletedTasksCountByListName,
    tasksOnToday,
    allTasksFromList
} from "./list.models.js";

export const listRoutes = new Router()

listRoutes.get('/dashboard', dashboardHandler)
listRoutes.get('/collection/today', todayTasksHandler)
listRoutes.get('/lists/:listId/tasks', tasksFromListHandler)

function dashboardHandler(req, res) {
    Promise.all([taskCountOnToday(),
        groupNotCompletedTasksCountByListName()])
        .then(results => res.json({"todayTasksCount": results[0][0].count, "lists": results[1]}))
}

function todayTasksHandler(req, res) {
    tasksOnToday()
        .then(list => res.json(list))
        .catch(() => res.sendStatus(500))
}

function tasksFromListHandler(req, res) {
    const all = req.query.all||false
    const listId = req.params['listId']
        allTasksFromList(listId, all)
            .then(tasks => res.json(tasks))
            .catch(() => res.sendStatus(500))
}