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
        .then(results => res.json({
            "todayTasksCount": parseInt(results[0][0].count),
            "lists": results[1].map(l => {
                return {
                    name: l.name,
                    id: parseInt(l.id),
                    undone: parseInt(l.undone)
                }
            })
        }))
}

function todayTasksHandler(req, res) {
    tasksOnToday()
        .then(list => res.json(list.map(l => {
            return {
                task: l.task,
                taskId: parseInt(l.taskId),
                done: l.done,
                due_date: l.due_date,
                list: {
                  name: l.list,
                  listId: parseInt(l.listId)
                }
            }
        })))
        .catch(() => res.sendStatus(500))
}

function tasksFromListHandler(req, res) {
    const all = req.query.all || false
    const listId = req.params['listId']
    allTasksFromList(listId, all)
        .then(tasks => res.json(tasks))
        .catch(() => res.sendStatus(500))
}