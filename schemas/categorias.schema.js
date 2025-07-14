import zod from 'zod';

const categoriaSchema = zod.object({

    // El campo nombre es obligatorio y debe ser un string
    "nombre": zod.string({
        message: 'El nombre es obligatorio'
    }).min(2, {
        message: 'El nombre debe tener al menos 2 caracteres'
    })
    
}).strict()

export const validateCategoria = (categoria) => {
    return categoriaSchema.safeParse(categoria)
}