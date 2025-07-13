import pool from '../config/db.js';

export const getAllProductos = async () => {

    const query = `SELECT 
                    p.id,
                    p.nombre,
                    p.precio,
                    p.descripcion,
                    p.disponible,
                    p.fecha_ingreso,
                    GROUP_CONCAT(c.nombre) as categorias
                    FROM productos p
                    LEFT JOIN categorias c ON c.id = p.categoria_id
                    GROUP BY p.id;`

    const [results] = await pool.query(query); // Ejecuta la consulta
    return results; // Devuelve los resultados
};

export const getProductoById = async (id) => {

    const query = `SELECT 
                    p.id,
                    p.nombre,
                    p.precio,
                    p.descripcion,
                    p.disponible,
                    p.fecha_ingreso,
                    GROUP_CONCAT(c.nombre) as categorias
                    FROM productos p
                    LEFT JOIN categorias c ON c.id = p.categoria_id
                    WHERE p.id = ?
                    GROUP BY p.id;`

    // previene SQL injection usando un placeholder '?'
    const [data] = await pool.query(query, [id]); // Ejecuta la consulta con el ID proporcionado
    return data
};

export const insertProducto = async (producto) => {
    
    const conn = await pool.getConnection(); // Obtiene una conexión del pool
    
    try {

        conn.beginTransaction(); // Inicia una transacción

        const { nombre, precio, descripcion, disponible, categoria_id } = producto;

  
        //Prepara la consulta SQL para insertar un nuevo producto
        const query = `INSERT INTO productos (nombre, precio, descripcion, disponible, categoria_id) 
                       VALUES ( ?, ?, ?, ?, ?)`; // tambien se puede usar named Placeholders como :nombre, :precio, etc.
        
        await conn.query(query, [ nombre, precio, descripcion, disponible, categoria_id]); // Ejecuta la consulta  
        
        conn.commit(); //confirmar la transacción

        return producto
        
    } catch (error) {

        conn.rollback(); // Si ocurre un error, deshace la transacción
        throw error; // Lanza el error para que pueda ser manejado por el controlador

    } finally {

        conn.release(); // Libera la conexión de vuelta al pool
    }
}

export const updateProducto = async (id, producto) => {

    const query = `UPDATE productos 
                   SET nombre = ?, precio = ?, descripcion = ?, disponible = ?,  categoria_id = ?
                   WHERE id = ?`;

    // Ejecuta la consulta para actualizar el producto con el ID proporcionado
    const [result] = await conn.execute(query, [
      nombre, precio, descripcion, disponible, categoria_id, id
    ]);

    return result; // Devuelve el resultado de la actualización
}

export const deleteProducto = async (id) => {

    const query = `DELETE FROM productos WHERE id = ?`;
    await pool.query(query, [id]); // Ejecuta la consulta para eliminar el producto
}


export const getProductosDisponibles = async () => {
    
    const query = `SELECT 
                    p.id,
                    p.nombre,
                    p.precio,
                    p.descripcion,
                    p.disponible,
                    p.fecha_ingreso,
                    GROUP_CONCAT(c.nombre) as categorias
                    FROM productos p
                    LEFT JOIN categorias c ON c.id = p.categoria_id
                    WHERE p.disponible = true
                    GROUP BY p.id;`

    const [results] = await pool.query(query);
    return results;
};


