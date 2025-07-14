import { validateCategoria } from '../schemas/categorias.schema.js';
import { 
    getAllCategorias,
    getCategoriasById, 
    insertCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoriaByNombre
} from '../models/categorias.js';


export const getAll = async (req, res) => {
    try {
        const categoriasDB = await getAllCategorias();
        res.status(200).json(categoriasDB);
    } catch (error) {
        res.status(400).json({
            message: 'Error al obtener las categorías'+ error.message,
        });
    }
}

export const getById = async (req, res) => {
    const { id } = req.params; 
    const result = await getCategoriasById(id);

    if (result.length === 0) {
        return res.status(404).json({
            message: `Categoría con ID ${id} no encontrada`
        });
    }

    const categoria = result[0]; // Obtiene el primer elemento del array
    res.status(200).json(categoria);
}

export const create = async (req, res) => {

    const data = req.body;
    
    const { success, error, data:safeData } = validateCategoria(data); 
    
    if (!success) {
        return res.status(400).json({
            message: 'Error de validación: ' + error.message,
        });
    }

    try {
        const existe = await getCategoriaByNombre(safeData.nombre);
        if (existe.length > 0) {
            return res.status(409).json({
                message: `Ya existe una categoría con el nombre "${safeData.nombre}"`
            });
        }

        const response = await insertCategoria(safeData);
        res.status(201).json({
            message: 'Categoría creada correctamente',
            data: response
        });
        
    } catch (error) {
        res.status(400).json({
            message: 'Error al insertar la categoría: ' + error.message,
        });
    }
}

export const update = async (req, res) => {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
        return res.status(400).json({
            message: 'ID inválido'
        });
    }

    const data = req.body;

    // Validar existencia de la categoría
    const categoriaExistente = await getCategoriasById(parsedId);
    if (categoriaExistente.length === 0) {
        return res.status(404).json({
            message: `Categoría con ID ${id} no encontrada`
        });
    }

    const { success, error, data:safeData } = validateCategoria(data);
    if (!success) {
        return res.status(400).json({
            message: 'Error de validación: ' + error.message,
        });
    }

    try {
        const result = await updateCategoria(parsedId, safeData);
        res.status(200).json({
            message: `Categoría con ID ${id} actualizada correctamente`,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar la categoría: ' + error.message
        });
    }

}

export const remove = async (req, res) => {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
        return res.status(400).json({
            message: 'ID inválido'
        });
    }

    const categoriaExistente = await getCategoriasById(parsedId);
    if (categoriaExistente.length === 0) {
        return res.status(404).json({
            message: `Categoría con ID ${id} no encontrada`
        });
    }

    try {
        await deleteCategoria(parsedId);
        res.status(200).json({
            message: `Categoría con ID ${id} eliminada correctamente`
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al eliminar la categoría: ' + error.message
        });
    }
}
