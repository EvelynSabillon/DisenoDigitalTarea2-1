import {Router} from 'express'; // Importa Router de express para crear un router
import { isAuth } from '../middlewares/isAuth.js'; // Importa el middleware de autenticación
import {
    getAll,
    getById,
    create,
    update,
    remove,
} from '../controllers/categorias.controller.js'; // Importa los controladores de categorías

const categoriasRouter = Router(); // Crea un router para manejar las rutas de categorías

categoriasRouter.get('/', isAuth, getAll);
categoriasRouter.get('/:id', isAuth, getById);
categoriasRouter.post('/', isAuth, create);
categoriasRouter.put('/:id', isAuth, update);
categoriasRouter.delete('/:id', isAuth, remove);

export default categoriasRouter; // Exporta el router para usarlo en index.js
