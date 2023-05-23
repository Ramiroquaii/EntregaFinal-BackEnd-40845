const { MongoClient, ServerApiVersion } = require('mongodb');
const { urlAtlas, mongoDBase } = require('../environment.js');

function connectAtlas(){
    const client = new MongoClient(
        urlAtlas,
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
        }
    );
    return client;
}

async function searchProducts(){
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");

    try {
        const options = {
            sort: { name: 1 }, // sort returned documents in ascending order by name (A->Z).
            projection: { _id: 1, name: 1, price: 1, photo: 1 }, // Include only fields in document.
        };
        const documents = await collectionProductos.find({},options).toArray(); //Si no hay resultados find retornara un arreglo vacio [].
        return documents;
    } catch (error) {
        console.log(error);
        return -1; // Para retornar estado de error durante la consulta se retorna (-1) en numero.
    } finally {
        await client.close();
    }
}

async function searchProductById(id){
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");

    try {
        const query = { _id: id };
        const result = await collectionProductos.findOne(query);
        if(result != null){
            return result;
        } else {
            return -1;
        }
    } finally {
        await client.close();
    }
}

async function insertProduct(newProduct){
    const client = connectAtlas();
    const databaseAtlas = client.db(mongoDBase);
    const collectionProductos = databaseAtlas.collection("productos");

    try {
        const cursorAtlas = await collectionProductos.insertOne(newProduct); // Retorna objeto resultado con acknowledged:boolean e insertedId:string.
        return cursorAtlas;
    } catch (error) {
        console.log(error);
        return -1; // Para retornar estado de error durante la consulta se retorna (-1) en numero.
    } finally {
        await client.close();
    }
}

module.exports = { searchProducts, insertProduct, searchProductById };