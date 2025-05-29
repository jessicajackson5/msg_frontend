
import express from 'express'
import userController from '../controllers/users.controller.js'
/* Esta ruta se encarga de manajar users */
/* PASO 1: Crear la ruta usersRouter */
const usersRouter = express.Router()
//PASO 3: Creo las consultas que va a tener mi enroutador
// /api/users + '/'
usersRouter.get('/', userController.getAll)
// /api/users + '/'
usersRouter.post('/register', userController.register)
usersRouter.post('/login', userController.login)

usersRouter.get('/verify', userController.verify)

usersRouter.get('/resend-verification-mail', userController.resendVerificationEmail)

// api/users/api/users/hola
usersRouter.put('/api/users/hola', (request, response) => {
    response.send("FUNCIONAAAA")
})

export default usersRouter
