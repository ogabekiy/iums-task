import pg from "pg"
import fs from "fs"
import path from "path"
import 'dotenv/config'

const { Pool } = pg

export const pool = new Pool({
     user: process.env.DB_USER,
     host: process.env.DB_HOST,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     port: process.env.DB_PORT,
     ssl: false
})

export const setTables = async () => {
     const rootPath = path.join(process.cwd(), "src", "migrations", "database.txt")
     const readFile = fs.readFileSync(rootPath, "utf-8")
     await pool.query(`
        ${readFile}
    `)
     console.log("Tables created.");
}    