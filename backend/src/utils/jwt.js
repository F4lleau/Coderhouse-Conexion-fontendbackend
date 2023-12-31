import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '12h' })
    console.log(token)
    return token
}

//generateToken ({"_id":"650a632d193fd103d4433ea5","nombre":"Sofia","apellido":"Montes Falleau","edad":"16","email":"montesfalleau@gmail.com","password":"1234"})

export const authToken = (req, res, next) => {
    //Consultar al header para obtener el Token
    const authHeader = req.headers.Authorization
    if (!authHeader) {
        return res.status(401).send({ error: 'Usuario no autenticado' })
    }
    const token = authHeader.split(' ')[1] //Obtengo el token y descarto el Bearer
    jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
        if (error) {
            return res.status(403).send({ error: 'Usuario no autorizado, token invalido' })
        }
    })
    //Usuario valido
    req.user = credential.user
    next()
}