const { searchProducts, insertProduct, searchProductById } = require('../dao/productDao.js');

async function getProducts(){
    const products = await searchProducts();
    let datosActualizados;

    if (products.length !== 0) {
        datosActualizados = products.map(objeto => {
            const nuevoObjeto = { ...objeto };
            nuevoObjeto._id = objeto._id.toString(); // Convertir ObjectId a string
            return nuevoObjeto;
        });
        return datosActualizados;
    }
    if (products === -1) {
        return -1;
    } else {
        return [];
    }
}

async function getProductsById(id){
    
}

async function saveProduct(newProduct){
    
}

module.exports = { getProducts, getProductsById, saveProduct };