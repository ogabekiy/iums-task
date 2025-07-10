import DatabaseService from "./database.service.js"
import JwtService from "./jwt.service.js"
import mailService from "./mail.service.js"

class AuhtService {
     constructor() {
          this.databaseService = new DatabaseService()
          this.jwtService = new JwtService()
          this.email = new mailService()
     }

     async register(data) {
          const info = await this.databaseService.register(data);

          const token = this.jwtService.createToken(info.id);


          const activationLink = `${process.env.CLIENT_URL}/api/auth/email/${token}`;
          await this.email.sendActivationMail(info.email, activationLink);

          return {
               message: "Foydalanuvchi ro'yxatdan o'tdi. Emailga aktivatsiya link yuborildi."
          };

     }

     async login(data) {
          const checkEmail = await this.databaseService.login(data.email)
          const token = this.jwtService.createToken(checkEmail.id)
          return token

     }

     async Activate(token) {

          const decoded = this.jwtService.verifyToken(token)

          return await this.databaseService.isActive(decoded.userId)
     }
}

export default AuhtService