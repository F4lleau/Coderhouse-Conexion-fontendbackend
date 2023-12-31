import { Router } from "express"
import { passportError, authorization } from "../utils/messagesError.js";
import { productController } from "../controllers/products.controllers.js";
const productRouter = Router();

productRouter.get('/', passportError('jwt'), authorization(['user','admin','premium']), productController.getProducts);
productRouter.post('/', passportError('jwt'), authorization(['admin']), productController.createProduct);
productRouter.get('/:id', passportError('jwt'), authorization(['user','admin','premium']), productController.getProduct);
productRouter.delete('/:id', passportError('jwt'), authorization(['user','admin','premium']), productController.deleteProduct)
productRouter.put('/:code', passportError('jwt'), authorization(['user','admin','premium']), productController.updateProduct);
productRouter.post('/mockingproducts', passportError('jwt'), authorization(['admin']), productController.createMockProduct);
productRouter.post('/mockingproducts/:number', passportError('jwt'), authorization(['admin']), productController.createMockProducts);

export default productRouter
//apolicando controladores 

/*
productRouter.get('/', async (req, res) => {
    const { limit } = req.query

    try {
        const prods = await productModel.find().limit(limit)
        res.status(200).send({ respuesta: 'OK', mensaje: prods })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar productos', mensaje: error })
    }
})

productRouter.get('/', async (req, res) => {
    const { limit, page, category, sort } = req.query

    try {
        let query = {}
        let link 
        if (category){
            query.category = category
            link = `&category=${query.category}`
        }

        let options = {
            limit: parseInt(limit) || 10,
            page: parseInt(page) || 1,
            sort: {
                price: sort || 1
            }
        }

        const prods = await productModel.paginate(query, options)

        const respuesta = {
            status: "success",
            payload: prods.docs,
            totalPages: prods.totalPages,
            prevPage: prods.prevPage,
            nextPage: prods.nextPage,
            page: prods.page,
            hasPrevPage: prods.hasPrevPage,
            hasNextPage: prods.hasNextPage,
            prevLink: prods.hasPrevPage ? `http://${req.headers.host}${req.baseUrl}?limit=${options.limit}&page=${prods.prevPage}${link || ''}&sort=${options.sort.price}` : null,
            nextLink: prods.hasNextPage ? `http://${req.headers.host}${req.baseUrl}?limit=${options.limit}&page=${prods.nextPage}${link || ''}&sort=${options.sort.price}` : null
        }

        res.status(200).send({ respuesta: respuesta })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar productos', mensaje: error })
    }
})

productRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findById(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: prod })
        else
            res.status(404).send({ respuesta: 'Error en consultar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta producto', mensaje: error })
    }
})

productRouter.post('/', async (req, res) => {
    const { title, description, stock, code, price, category } = req.body
    try {
        const prod = await productModel.create({ title, description, stock, code, price, category })
        res.status(200).send({ respuesta: 'OK', mensaje: prod })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear productos', mensaje: error })
    }
})

productRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, stock, status, code, price, category } = req.body

    try {
        const prod = await productModel.findByIdAndUpdate(id, { title, description, stock, status, code, price, category })
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: 'Producto actualizado' })
        else
            res.status(404).send({ respuesta: 'Error en actualizar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en actualizar producto', mensaje: error })
    }
})

productRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findByIdAndDelete(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: 'Producto eliminado' })
        else
            res.status(404).send({ respuesta: 'Error en eliminar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar producto', mensaje: error })
    }
})*/


