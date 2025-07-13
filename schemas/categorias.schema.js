import zod from 'zod';

const categoriaSchema = zod.object({

    // El campo nombre es obligatorio y debe ser un string
    "nombre": zod.string().min(2)
    
}).strict()

export const validateCategoria = (categoria) => {
    return categoriaSchema.safeParse(categoria)
}