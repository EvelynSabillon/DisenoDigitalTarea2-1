import pool from '../config/db.js';

export const getAllCategorias = async () => {

    const query = `SELECT * FROM categorias ORDER BY id DESC`; // Consulta para obtener todas las categorías ordenadas por ID descendente
    const [results] = await pool.query(query); // Ejecuta la consulta
    return results; // Devuelve los resultados
};

export const getCategoriasById = async (id) => {

    const query = `SELECT * FROM categorias WHERE id = ?`;
    // previene SQL injection usando un placeholder '?'
    const [data] = await pool.query(query, [id]); // Ejecuta la consulta con el ID proporcionado
    return data
};

export const getCategoriaByNombre = async (nombre) => {
    const query = `SELECT * FROM categorias WHERE nombre = ?`;
    const [rows] = await pool.query(query, [nombre]);
    return rows;
};

export const insertCategoria = async (categoria) => {
    
    const conn = await pool.getConnection(); // Obtiene una conexión del pool
    
    try {

        conn.beginTransaction(); // Inicia una transacción

        const { nombre } = categoria;

  
        //Prepara la consulta SQL para insertar un nuevo producto
        const query = `INSERT INTO categorias (nombre) 
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
    
    const conn = await pool.getConnection();

    try {

        await conn.beginTransaction(); // Inicia una transacción

        const { nombre } = categoria;

        const query = `UPDATE categorias 
                       SET nombre = ? 
                       WHERE id = ?`;

        await conn.query(query, [nombre, id]); // Ejecuta la consulta de actualización

        conn.commit(); // Confirma la transacción

        return { id, nombre }; // Devuelve el objeto actualizado
        
    } catch (error) {

        conn.rollback();
        throw error; 

    } finally {

        conn.release(); 
    }
}

export const deleteCategoria = async (id) => {
    const conn = await pool.getConnection();
    
    try {

        await conn.beginTransaction(); // Inicia la transacción
        
        const [productos] = await conn.query(`SELECT id FROM productos WHERE categoria_id = ?`, [id]);
        if (productos.length > 0) {
            throw new Error(`No se puede eliminar la categoría con ID ${id} porque tiene productos asignados`);
        }

        const query = `DELETE FROM categorias WHERE id = ?`;
        
        await conn.query(query, [id]);
        
        conn.commit(); // Confirma la transacción

        return { deletedId: id };  

    } catch (error) {

        await conn.rollback(); // Deshace la transacción si ocurre un error
        throw error;

    } finally {

        conn.release(); // Libera la conexión al pool
    }
}
