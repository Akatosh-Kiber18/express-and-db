import {pool} from "../database.js";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const horizon = process.argv[2] || 0;

pool.query('SELECT name, "birthday" FROM public.employees')
    .then(res => groupEmployeeByBirthdayMonth(res.rows))
    .then(res => formatEmployeeBirthdaySchedule(res))
    .then(res => console.log(res))
    .then(() => pool.end())

function groupEmployeeByBirthdayMonth(employees) {
    let monthEmployees = new Map();

    monthNames.forEach(mName => monthEmployees.set(mName, []));
    employees.forEach(e => {
        let bDate = new Date(e.birthday)
        let month = monthNames[bDate.getMonth()];
        monthEmployees.get(month).push(e);
    });

    return monthEmployees;
}

function formatEmployeeBirthdaySchedule(monthEmployees) {
    let date = new Date();
    let res = '';
    monthNames
        .filter((m, i) => {
            let relativeMonthNumber = i - date.getMonth();
            return relativeMonthNumber >= 0 && relativeMonthNumber <= horizon;
        })
        .forEach((m) => {
            res += `${m} ${date.getFullYear()}\n`;
            monthEmployees.get(m).forEach(employee => {
                const bDate = employee.birthday
                res += `(${bDate.getDate()}) - ${employee.name} (${date.getFullYear() - bDate.getFullYear() + 1} years!)\n`
            })
            if (monthEmployees.get(m).length === 0) {
                res += 'no employees birthdays in this month =(\n'
            }
        });
    return res;
}
