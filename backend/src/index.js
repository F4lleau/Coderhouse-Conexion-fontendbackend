import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

import path from 'path'
import { __dirname } from './path.js'
import { addLogger } from "./utils/logger.js"; 

import router from './routes/index.routes.js'

import { productModel } from './models/products.models.js'
import { messageModel } from './models/messages.models.js'

import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.js'
import session from 'express-session'
import { userModel } from './models/user.models.js'
import userRouter from './routes/user.routes.js'


const whiteList =  ['http://localhost:5173/']

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Acceso denegado"))
        }
    }
}

const app = express()
const PORT = 8080

const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

//Mongoose DB

mongoose.connect(process.env.MONGO_URL)
    .then(async () => console.log('DB is connected'))
    .catch(() => console.log('Error in connection'))

//Middlewares

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SIGNED_COOKIE)) //cookie firmada 
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true ,
            useUnifiedTopology: true
        },
        ttl: 500 //duración de la sesión en la BDD en segundos 
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false

}))
app.use('/api/users', userRouter)

//uso de passport en la app 
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Handlebars

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use('/realTimeProducts', express.static(path.join(__dirname, '/public')))
app.use('/chat', express.static(path.join(__dirname, '/public')))
app.use('/login', express.static(path.join(__dirname, '/public')))
app.use('/signIn', express.static(path.join(__dirname, '/public')))
app.use('/logOut', express.static(path.join(__dirname, '/public')))

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        js: "realTimeProducts.js",
        css: "style.css",
        title: "Products",
    })
})

app.get('/static', (req, res) => {
    res.render('home', {
        js: "home.js",
        css: "style.css",
        title: "Home",
    })
})

app.get('/chat', (req, res) => {
    res.render('chat', {
        globalCss: 'style.css',
        title: 'Chat Socket.io',
        js: 'chat.js',
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        js: "login.js",
        css: "style.css",
        title: "Login",
    })
})

app.get('/signIn', (req, res) => {
    res.render('signIn', {
        js: "signIn.js",
        css: "style.css",
        title: "SignIn",
    })
})

app.get('/logOut', (req, res) => {
    res.render('logOut', {
        js: "logOut.js",
        css: "style.css",
        title: "LogOut",
    })
})

//Socket


const io = new Server(serverExpress)

io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")

    socket.on("llamarProductos", async () => {
        const products = await productModel.find()
        socket.emit("productos", products)
    })

    socket.on("nuevoProducto", async (nuevoProd) => {
        const { title, description, price, stock, category, code, thumbnail } = nuevoProd
        await productModel.create({ title, description, price, stock, category, code, thumbnail })
    })

    socket.on('newMessage', async ({ email, message }) => {
        await messageModel.create({ email: email, message: message })
        const messages = await messageModel.find()
        socket.emit("showMessages", messages)
    })

    socket.on('loadChats', async () => {
        const messages = await messageModel.find()
        socket.emit("showMessages", messages)
    })

})

//Routes

app.use('/', router)

//Routes Logger
app.use(addLogger)
app.get('/info', (req, res) => {
    req.logger.info('<span style="color:blue">Texto informativo de Info</span><br/>')
    res.send("Hola!")
})

app.get('/warning', (req, res) => {
    req.logger.warning('<span style="color:cyan">Texto Warning</span><br/>')
    res.send("Hola!")
})

app.get('/error', (req, res) => {
    req.logger.error('<span style="color:yellow">Texto Error</span><br/>')
    res.send("Hola!")
})

app.get('/fatal', (req, res) => {
    req.logger.fatal('<span style="color:red">Texto informativo de Info</span><br/>')
    res.send("Hola!")
})

app.get('/testArtillery', (req, res) => {
    res.send(" Artillery")
})





