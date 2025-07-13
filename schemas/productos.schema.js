import zod from 'zod';

const productoSchema = zod.object({

    // El campo nombre es obligatorio y debe ser un string
    "nombre": zod.string().min(2),
    // El precio debe ser un número positivo mayor a cero
    "precio": zod.number().positive(),
    // La descripcion debe tener un mínimo de 10 caracteres
    "descripcion": zod.string().min(10),
    // El campo disponible debe ser un valor booleano (true o false)
    "disponible": zod.boolean(),
    
}).strict()

export const validateProducto = (producto) => {
    return productoSchema.safeParse(producto)
}