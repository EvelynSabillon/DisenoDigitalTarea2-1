import { validateCategoria } from '../schemas/categorias.schema.js';
import { 
    getAllCategorias,
    getCategoriaById, 
    insertCategoria,
    updateCategoria,
    deleteCategoria,
} from '../models/categorias.js';


export const getAll = async (req, res) => {
    try {
        const categorias = await getAllCategorias();
        
    } catch (error) {
        
    }
}

export const getById = async (req, res) => {

}

export const create = async (req, res) => {

}

export const update = async (req, res) => {

}

export const remove = async (req, res) => {

}
