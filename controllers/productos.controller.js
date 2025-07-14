import { validateProducto } from '../schemas/productos.schema.js';
import { 
    getAllProductos, 
    getProductoById, 
    insertProducto,
    updateProducto,
    deleteProducto,
    getProductosDisponibles
} from '../models/productos.js';
import { getCategoriasById } from '../models/categorias.js'


export const getAll = async (req, res) => {
    try {
        const productosDB = await getAllProductos();
        const parsedProductos = productosDB.map(producto => {
            return {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                descripcion: producto.descripcion,
                disponible: producto.disponible,
                fecha_ingreso: producto.fecha_ingreso,
                categoria: producto.categoriaId ? {
                    categoriaId: producto.categoriaId,
                    nombre: producto.categoriaNombre
                } : null
            }   
        })

        res.status(200).json(parsedProductos);

    } catch (error) {
        
        res.status(400).json({
            message: 'Error al obtener los productos' + error.message,
        });
    }
}

export const getDisponibles = async (req, res) => {
    
    try {
        const productosDB = await getProductosDisponibles();

        res.status(200).json(productosDB);

    } catch (error) {
        
        res.status(400).json({
            message: 'Error al obtener los productos' + error.message,
        });
    }
}

export const getById = async (req, res) => {
    const { id } = req.params; 
    const result = await getProductoById(id);

    if (result.length === 0) {
        return res.status(404).json({
            message: `Producto con ID ${id} no encontrado`
        });
    }

    const producto = result[0]; // Obtiene el primer elemento del array

    const parsedProducto = {
        id: producto.id,
        nombre: producto.nombre,   
        precio: producto.precio,
        descripcion: producto.descripcion,
        disponible: producto.disponible,
        fecha_ingreso: producto.fecha_ingreso,
        categoria: producto.categoriaId ? {
            categoriaId: producto.categoriaId,
            nombre: producto.categoriaNombre
        } : null
    };

    res.status(200).json(parsedProducto);
}

export const create = async (req, res) => {

    const data = req.body;
    const { success, error, data: safeData } = validateProducto(data); // Valida los datos del producto

    if (!success) {
        return res.status(400).json({
            message: 'Error de validación'+ error.message,
        });
    }

    try {

        const dataToInsert = {
            ...safeData,
            categoria_id: safeData.categoriaId
        };
        
        const categoria = await getCategoriasById(dataToInsert.categoria_id);
        if (categoria.length === 0) {
            return res.status(404).json({
                message: `La categoría con ID ${dataToInsert.categoria_id} no existe`,
            });
        }

        const response = await insertProducto(dataToInsert) // inserta la película en la base de datos

        res.status(201).json({
            message: 'Producto creado correctamente',
            data: response
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error al insertar el producto: ' + error.message,
        })
    }

}

export const update = async (req, res) => {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    const { success, error, data: safeData } = validateProducto(req.body);
    if (!success) {
        return res.status(400).json({
            message: 'Error de validación: ' + error.message
        });
    }

    try {

        const dataToUpdate = {
            ...safeData,
            categoria_id: safeData.categoriaId
        };

        const result = await updateProducto(parsedId, dataToUpdate);

        res.status(200).json({
            message: 'Producto actualizado correctamente',
            data: result
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error al actualizar el producto: ' + error.message
        });
    }
}

export const remove = async (req, res) => {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const producto = await getProductoById(parsedId);

        if (producto.length === 0) {
            return res.status(404).json({
                message: `Producto con ID ${parsedId} no encontrado`
            });
        }

        await deleteProducto(parsedId);

        res.status(200).json({
            message: 'Producto eliminado correctamente',
            deletedId: parsedId
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el producto: ' + error.message
        });
    }
}

