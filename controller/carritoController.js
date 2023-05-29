const { searchCarrito, insertCarrito, searchCarritoById, searchCarritoByUser, deleteCarrito, updateCarrito } = require('../dao/carritoDao.js');

async function getCarritos(){
    const carritos = await searchCarrito();
    let datosActualizados;

    if (carritos.length !== 0) {
        datosActualizados = carritos.map(objeto => {
            const nuevoObjeto = { ...objeto };
            nuevoObjeto._id = objeto._id.toString(); // Convertir ObjectId a string
            return nuevoObjeto;
        });
        return datosActualizados;
    }
    if (carritos === -1) {
        return -1;
    } else {
        return [];
    }
}

async function getCarritoById(id){
    const carrito = await searchCarritoById(id);
    if(carrito != null){
        return carrito;
    } else {
        return -1;
    }
}

async function getCarritoByUser(usr_id){
    const carrito = await searchCarritoByUser(usr_id);
    if(carrito != null){
        return carrito;
    } else {
        return -1;
    }
}

async function saveCarrito(){

}

async function eliminarCarrito(){

}

async function actualizarCarrito(){

}

module.exports = { getCarritos, getCarritoById, getCarritoByUser, saveCarrito, eliminarCarrito, actualizarCarrito };