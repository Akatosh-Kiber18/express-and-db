import pg from 'pg';
export const pool = new pg.Pool({
    user: 'todolist_app',
    host: '127.0.0.1',
    database: 'postgres',
    password: '12345678',
    port: 5432,
});

