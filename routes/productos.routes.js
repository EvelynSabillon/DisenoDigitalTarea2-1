import {Router} from 'express'; // Importa Router de express para crear un router
import { isAuth } from '../middlewares/isAuth.js'; // Importa el middleware de autenticación
import {
    getAll,
    getById,
    create,
    update,
    remove,
    getDisponibles
} from '../controllers/productos.controller.js'; // Importa los controladores de productos

const productosRouter = Router(); // Crea un router para manejar las rutas de productos

productosRouter.get('/', isAuth, getAll); 
productosRouter.get('/disponibles', isAuth, getDisponibles); 
productosRouter.get('/:id', isAuth, getById);
productosRouter.post('/', isAuth, create);
productosRouter.put('/:id', isAuth, update);
productosRouter.delete('/:id', isAuth, remove);

export default productosRouter; // Exporta el router para usarlo en index.js