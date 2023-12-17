import mysql from 'serverless-mysql'

export const connection = mysql({
    config: {
        host: process.env.DB_HOSt,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
}) 