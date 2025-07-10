import { pool } from "../config/database.js";
import CustomError from "../utils/error.js";
import bcrypt from 'bcrypt'

class DatabaseService {
     constructor() {
          this.pool = pool
     }

     async register({ fullname, email, password, activationToken }) {
          const { rowCount } = await pool.query(`select * from users where email = $1`, [email])

          if (rowCount > 0) throw new CustomError('User already exists')

          const hashedPassword = await bcrypt.hash(password, 12)

          const result = await pool.query(`
              insert into users (fullname, password,email, activation_token)  values ($1,$2,$3,
              $4) RETURNING *;
            `, [fullname, hashedPassword, email, activationToken])

          return result.rows[0]
     }

     async login(email) {
          const { rows } = await this.pool.query(`select * from users where  email = $1 `, [email])
          if (!rows) throw new CustomError('Email not found')
          return rows
     }

     async findByid(id) {
          const { rows } = await this.pool.query(`select * from users where  id = $1 `, [id])
          if (!rows) throw new CustomError('id not found')
          return rows
     }

     async isActive(id) {

          await pool.query(`UPDATE users
               SET is_active = true
               WHERE id = $1;
                         `, [id])
     }
}

export default DatabaseService