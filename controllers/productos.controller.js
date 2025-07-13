import { validateProducto } from '../schemas/productos.schema.js';
import { 
    getAllProductos, 
    getProductoById, 
    insertProducto,
    updateProducto,
    deleteProducto,
    getProductosDisponibles
} from '../models/productos.js';


export const getAll = async (req, res) => {
    try {
        const productos = await getAllProductos();
        
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

export const getDisponibles = async (req, res) => {
    
}