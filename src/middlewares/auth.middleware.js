import jwt from "jsonwebtoken";

// Middleware de Autorización: Intercepta la petición antes de llegar al controlador
export const verifyToken = (req, res, next) => {
   
    // Buscamos el token en los headers de la petición 
    //Se usa .split(' ')[1] porque el estándar es: "Bearer TOKEN_ACA"
    const token = req.headers['authorization']?.split(' ')[1];

    // Validación:  si no hay token, cortamos el flujo (Status 401)
    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. Se requiere login." });
    }

    try {
        // Verificación de integridad: comprobamos que el token fue firmado por nosotros
        // Verificamos si el token es válido usando la clave del .env
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Guardamos el ID del usuario para usarlo después
        next(); //  Pasa al controlador
    } catch (error) {
        res.status(403).json({ error: "Token inválido o expirado." });
    }
};