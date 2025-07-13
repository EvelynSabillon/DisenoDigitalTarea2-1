import jwt from 'jsonwebtoken'; // para generar el token
import bcrypt from 'bcrypt' // para encriptar la contraseña
import {loginUser, register} from '../models/auth.js'; // servicio para autenticar al usuario
import { Resend } from 'resend'; // para enviar correos electrónicos
import { v4 as uuidv4 } from 'uuid'; // para generar un id único

export const login = async (req, res) => {

    const { user, password } = req.body;

    const data = await loginUser(user)

    console.log(data)

    // validar que la contraseña sea correcta
    if (!await bcrypt.compare(password, data.password_hash)) {
        res.status(401).json({
            success: false,
            message: 'Usuario o contraseña incorrectos'
        })

        return
    }

    // validar si no debe cambiar la contraseña
    if (data.must_change_password) {
        // obligarlo a cambiar de contraseña
        //TODO: GENERAR UN TOKEN PROVISIONAL
    }


    // puedo retornar la información del usuario

    const payload = {
        id: data.id,
        role: data.role,

    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {  
        algorithm: 'HS256', // Sha2
        expiresIn: '1h'
    })

    delete data.password; // eliminar la contraseña del objeto de datos


    res.json({
        success: true,
        message: 'Usuario autenticado correctamente',
        data: data,
        token
    });
    

}


export const createUser = async (req, res) => {

    const { name, email, phone, role } = req.body

    const id = uuidv4()

    //generar una clave
    //TODO: generar una clave aleatoria
    const password_hash = await bcrypt.hash('1234', 10)

    try {

        const result = await register([id, name, email, phone, password_hash, role])
        
        // TODO: envair correro
        console.log(process.env.RESEND_API_KEY)
        const resend = new Resend(process.env.RESEND_API_KEY)

        res.json({
            success: true,
            message: 'Usuario creado correctamente',
            data: {
                id,
                name,
                email,
                phone
            }
        })

        
    } catch (error) {
        
        console.error(error)
        res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        })
        
    }

}