import mysql from 'mysql2/promise'; // Importa el paquete mysql2/promise para usar promesas
import dotenv from 'dotenv';

if (process.env.DB_HOST === undefined) {  // Verifica si las variables de entorno están definidas
    dotenv.config(); // Carga las variables de entorno desde el archivo .env
}

// Crea una conexión a la base de datos MySQL usando las variables de entorno
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // Espera conexiones
    connectionLimit: 10, // Límite de conexiones
    queueLimit: 0, // Sin límite de cola
    enableKeepAlive: true, // Habilita Keep-Alive para conexiones persistentes 
    // namedPlaceholders: true // Habilita marcadores de posición con nombre
});

export default pool; // Exporta el pool de conexiones para usarlo en otras partes de la aplicación