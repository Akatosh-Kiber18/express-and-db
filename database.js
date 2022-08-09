import pg from 'pg';
export const pool = new pg.Pool({
    user: 'username', //username
    host: '127.0.0.1',
    database: 'employees',
    password: 'password', //password
    port: 5432,
});

