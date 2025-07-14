import dotenv from 'dotenv';
dotenv.config(); // carga las variables de entorno desde el archivo .env
import express from 'express';
import cors from 'cors';
import './config/db.js'; // Importa la configuración de la base de datos
import authRouter from './routes/auth.routes.js';
import categoriasRouter from './routes/categorias.routes.js';
import productosRouter from './routes/productos.routes.js'; // Importa las rutas

const app = express(); // para crear la aplicación de express
const PORT = process.env.PORT || 3000; // puerto donde se ejecutará la aplicación

//middlewares
app.use(express.json()); // se encarga de parsear el body de las peticiones

app.use(cors({
    // origin: '*', // permite el acceso desde cualquier dominio
    //propiedad origin permite especificar qué dominios pueden acceder a la API
    origin: ['http://localhost:5500',],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // encabezados permitidos
}));

//rutas de autenticación
app.use('/auth', authRouter);

//rutas de categorias  
app.use('/categorias', categoriasRouter);

//rutas de productos
app.use('/productos', productosRouter);

//ruta por defecto
app.use((req, res) => {
    res.status(404).json({ 
        message: `Ruta no encontrada: ${req.url}` 
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});