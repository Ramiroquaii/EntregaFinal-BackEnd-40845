const Router = require('express');
const { getProducts, getProductsById, saveProduct } = require('../controller/productController.js');

const productRouter = new Router();

productRouter.get('/apii/productos', async (req, res) => {

    const productos = await getProducts();

    res.json(productos);
});

productRouter.get('/apii/productos/:id', async (req, res) => {
    const { id } = req.params;

    const producto = await getProductsById(id);

    res.json(producto);
});

productRouter.post('/apii/productos', async (req, res) => {
    const newProduct ={
        name : req.body.nombre,
        description : req.body.descripcion,
        photo : req.body.foto,
        price : req.body.precio,
        stock : req.body.cantidad
    }

    const addedProduct = await saveProduct(newProduct);

    res.json(addedProduct);
});

module.exports = { productRouter };