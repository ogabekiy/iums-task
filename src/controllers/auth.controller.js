import AuhtService from "../services/auth.service.js";

class AuthController {
        constructor() {
                this.authService = new AuhtService()
        }
        async register(req, res, next) {
                try {
                        const data = req.body
                        const result = await this.authService.register(data)
                        res.status(200).json({ message: "success", data: result })
                } catch (error) {
                        console.log(error)
                        next(error)
                } // 📌 info.id bo‘lsa => ok
        }

        async login(req, res, next) {
                try {
                        const data = req.body
                        const result = await this.authService.login(data)
                        res.status(200).json({ message: "success", data: result })
                } catch (error) {
                        next(error)
                }
        }

        async checkEmail(req, res, next) {
                try {
                        const {token} = req.params

                        const result = await this.authService.Activate(token)
                        res.status(200).json({ message: "success", data: result })

                } catch (error) {
                        next(error)
                }
        }
}

export default AuthController