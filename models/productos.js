import pool from '../config/db.js';

export const getAllProductos = async () => {

    const query = `SELECT 
                    p.id,
                    p.nombre,
                    p.precio,
                    p.descripcion,
                    p.disponible,
                    p.fecha_ingreso,
                    c.id AS categoriaId,
                    c.nombre AS categoriaNombre
                    FROM productos p
                    LEFT JOIN categorias c ON c.id = p.categoria_id`

    const [results] = await pool.query(query); // Ejecuta la consulta
    return results; // Devuelve los resultados
};

export const getProductosDisponibles = async () => {

    const query = `SELECT 
                    p.id,
                    p.nombre,
                    p.precio,
                    p.descripcion,
                    p.disponible,
                    p.fecha_ingreso,
                    c.id AS categoriaId,
                    c.nombre AS categoriaNombre
                    FROM productos p
                    LEFT JOIN categorias c ON c.id = p.categoria_id
                    WHERE p.disponible = true`;

    const [results] = await pool.query(query); // Ejecuta la consulta
    return results;
};

export const getProductoById = async (id) => {

    const query = `SELECT 
                    p.id,
                    p.nombre,
                    p.precio,
                    p.descripcion,
                    p.disponible,
                    p.fecha_ingreso,
                    c.id AS categoriaId,
                    c.nombre AS categoriaNombre
                    FROM productos p
                    LEFT JOIN categorias c ON c.id = p.categoria_id
                    WHERE p.id = ?`

    // previene SQL injection usando un placeholder '?'
    const [data] = await pool.query(query, [id]); // Ejecuta la consulta con el ID proporcionado
    return data
};

export const insertProducto = async (producto) => {
    const conn = await pool.getConnection(); 
    
    try {
        await conn.beginTransaction();

        const { nombre, precio, descripcion, disponible, categoria_id } = producto;

        // Validar que la categoría exista
        const [categoria] = await conn.query(`SELECT id, nombre FROM categorias WHERE id = ?`, [categoria_id]);
        if (categoria.length === 0) {
            throw new Error(`La categoría con ID ${categoria_id} no existe`);
        }

        // Insertar producto
        const insertQuery = `
            INSERT INTO productos (nombre, precio, descripcion, disponible, categoria_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [insertResult] = await conn.query(insertQuery, [nombre, precio, descripcion, disponible, categoria_id]);

        const insertedId = insertResult.insertId;

        // Consultar el producto insertado junto a su categoría
        const [rows] = await conn.query(`
            SELECT 
                p.id,
                p.nombre,
                p.precio,
                p.descripcion,
                p.disponible,
                p.fecha_ingreso,
                c.id AS categoriaId,
                c.nombre AS categoriaNombre
            FROM productos p
            JOIN categorias c ON p.categoria_id = c.id
            WHERE p.id = ?
        `, [insertedId]);

        await conn.commit();

        const p = rows[0];

        return {
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            descripcion: p.descripcion,
            disponible: !!p.disponible,
            fecha_ingreso: p.fecha_ingreso,
            categoria: {
                categoriaId: p.categoriaId,
                nombre: p.categoriaNombre
            }
        };

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

export const updateProducto = async (id, producto) => {
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        const { nombre, precio, descripcion, disponible, categoria_id } = producto;

        // Validar que la categoría exista
        const [categoria] = await conn.query(`SELECT id FROM categorias WHERE id = ?`, [categoria_id]);
        if (categoria.length === 0) {
            throw new Error(`La categoría con ID ${categoria_id} no existe`);
        }

        const query = `
            UPDATE productos 
            SET nombre = ?, precio = ?, descripcion = ?, disponible = ?, categoria_id = ?
            WHERE id = ?
        `;

        const [result] = await conn.query(query, [nombre, precio, descripcion, disponible, categoria_id, id]);

        // Consultar el producto actualizado
        const [rows] = await conn.query(`
            SELECT 
                p.id,
                p.nombre,
                p.precio,
                p.descripcion,
                p.disponible,
                p.fecha_ingreso,
                c.id AS categoriaId,
                c.nombre AS categoriaNombre
            FROM productos p
            JOIN categorias c ON p.categoria_id = c.id
            WHERE p.id = ?
        `, [id]);

        await conn.commit();

        const p = rows[0];

        return {
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            descripcion: p.descripcion,
            disponible: !!p.disponible,
            fecha_ingreso: p.fecha_ingreso,
            categoria: {
                categoriaId: p.categoriaId,
                nombre: p.categoriaNombre
            }
        };

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

export const deleteProducto = async (id) => {

    const query = `DELETE FROM productos WHERE id = ?`;
    await pool.query(query, [id]); // Ejecuta la consulta para eliminar el producto
}
