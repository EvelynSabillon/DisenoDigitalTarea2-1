import zod from 'zod';

const productoSchema = zod.object({

    // El campo nombre es obligatorio y debe ser un string
    "nombre": zod.string({
        message: "El nombre es obligatorio"
    }).min(2,{
        message: "El nombre debe tener al menos 2 caracteres"
    }),
    // El precio debe ser un número positivo mayor a cero
    "precio": zod.number({
        message: "El precio debe ser un número"
    }).positive({
        message: "El precio debe ser mayor a cero"
    }),
    // La descripcion debe tener un mínimo de 10 caracteres
    "descripcion": zod.string({
        message: "La descripción es obligatoria"
    }).min(10, {
        message: "La descripción debe tener al menos 10 caracteres"
    }),
    // El campo disponible debe ser un valor booleano (true o false)
    "disponible": zod.boolean({
        message: "El campo 'disponible' debe ser un valor booleano"
    }),
    // El campo categoria_id debe ser un número entero positivo
    "categoriaId": zod.number({
        message: "El campo 'categoria_id' es obligatorio"
    }).int({
        message: "El campo 'categoria_id' debe ser un número entero"
    }).positive({
        message: "El campo 'categoria_id' debe ser mayor a cero"
    }),
    
}).strict()

export const validateProducto = (producto) => {
    return productoSchema.safeParse(producto)
}