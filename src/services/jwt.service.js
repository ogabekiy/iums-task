import jwt from 'jsonwebtoken'
import CustomError from '../utils/error.js'

const secret_key = process.env.SECRET_KEY
class JwtService {
    createToken(userId) {
        try {
            const token = jwt.sign({ userId }, secret_key, { expiresIn: "4h" })
            return token
        } catch (error) {
            throw new CustomError("Token yaratishda xatolik")
        }
    }
    verifyToken(token) {
        try {
            const checkToken = jwt.verify(token, secret_key)
            return checkToken
        } catch (error) {
            throw new CustomError("Token invalid", 403)
        }
    }
}

export default JwtService