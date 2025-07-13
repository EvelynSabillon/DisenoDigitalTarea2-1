export const isAuth = (req, res, next) => {
    // Aquí iría la lógica para verificar si el usuario está autenticado
    // obtener los encabezados de la petición (token)
    // validar que el token sea válido
    // validar que el token no haya expirado

    // si cumple con las validaciones, continuar con la siguiente función del middleware o controlador

    // la ultima parte de la peticion (return)
    // res.status(401).json({
    //     message: 'Autenticación requerida'
    // })

    next(); // Llama a next() para continuar con la siguiente función del middleware o controlador
    // si no se llama a next(), la petición se queda ahí y no continúa
}