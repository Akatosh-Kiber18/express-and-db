import knex from "knex";

const kn = new knex(
    {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            port: 5432,
            user: 'todolist_app',
            password: '12345678',
            database: 'postgres'
        }
    }
)

export default kn