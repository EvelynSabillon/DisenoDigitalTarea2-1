import {Router} from 'express'; // Importa Router de express para crear un router
import { login, createUser } from '../controllers/auth.controller.js'

const authRouter = Router(); // Crea un router para manejar las rutas de autenticación

authRouter.post('/login', login)
authRouter.post('/register', createUser)

export default authRouter; // Exporta el router para usarlo en index.js
