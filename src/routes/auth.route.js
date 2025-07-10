import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'

const authRoute = Router()


const authController = new AuthController()
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Foydalanuvchini ro'yxatdan o'tkazish
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - password
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ro'yxatdan o'tish muvaffaqiyatli
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Foydalanuvchini tizimga kiritish (login)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli login
 *       401:
 *         description: Login xatosi - noto'g'ri ma'lumot
 */

/**
 * @swagger
 * /api/auth/email/{token}:
 *   get:
 *     summary: Email tasdiqlash uchun tokenni tekshirish
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Emailni faollashtirish tokeni
 *     responses:
 *       200:
 *         description: Email muvaffaqiyatli tasdiqlandi
 *       400:
 *         description: Noto'g'ri yoki eskirgan token
*/
authRoute.post('/auth/register', authController.register.bind(authController))
authRoute.post('/auth/login', authController.login.bind(authController))
authRoute.get('/auth/email/:token', authController.checkEmail.bind(authController))

export default authRoute