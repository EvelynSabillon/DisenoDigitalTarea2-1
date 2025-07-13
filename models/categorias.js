import pool from '../config/db.js';

export const getAllCategorias = async () => {

    const query = `SELECT * FROM categorias`;
    const [results] = await pool.query(query); // Ejecuta la consulta
    return results; // Devuelve los resultados
};

export const getCategoriasById = async (id) => {

    const query = `SELECT * FROM categorias WHERE id = ?`;
    // previene SQL injection usando un placeholder '?'
    const [data] = await pool.query(query, [id]); // Ejecuta la consulta con el ID proporcionado
    return data
};

export const insertCategoria = async (categoria) => {
    
    const conn = await pool.getConnection(); // Obtiene una conexión del pool
    
    try {

        conn.beginTransaction(); // Inicia una transacción

        const { nombre } = categoria;

  
        //Prepara la consulta SQL para insertar un nuevo producto
        const query = `INSERT INTO categoria (nombre) 
                       VALUES ( ? )`; 
        
        await conn.query(query, [ nombre ]); // Ejecuta la consulta  
        
        conn.commit(); //confirmar la transacción

        return categoria;
        
    } catch (error) {

        conn.rollback(); // Si ocurre un error, deshace la transacción
        throw error; // Lanza el error para que pueda ser manejado por el controlador

    } finally {

        conn.release(); // Libera la conexión de vuelta al pool
    }
}

export const updateCategoria = async (id, categoria) => {

    const query = `UPDATE categorias 
                   SET nombre = ? WHERE id = ?`;

    // Ejecuta la consulta para actualizar el producto con el ID proporcionado
    const [result] = await conn.execute(query, [
      nombre, id
    ]);

    return result; // Devuelve el resultado de la actualización
}

export const deleteCategoria = async (id) => {

    const query = `DELETE FROM categorias WHERE id = ?`;
    await pool.query(query, [id]); // Ejecuta la consulta para eliminar
}
