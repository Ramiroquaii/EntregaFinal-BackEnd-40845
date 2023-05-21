const bcrypt = require('bcrypt');
const { getUser, addUser } = require('../dao/userDao.js');

function encrypt(plainText) {
    bcrypt.hash(plainText, 5)
        .then(hash => {
            return hash;
        })
        .catch(err => {
            console.error(err);
            return -1;
        });
}

async function loginUser(usrName, pwd) {
    const storedUser = await getUser(usrName);

    if (storedUser != null) {
        try {
            const result = await bcrypt.compare(pwd, storedUser.passwd);
            if (result) {
                // La contraseña coincide
                return { estado: 1, usuario: storedUser };
            } else {
                // La contraseña no coincide
                return { estado: 0, mensaje: "LogIn error - Intnete nuevamente" };
            }
        } catch (error) {
            // Manejar el error
            console.log("Error en la decriptacion del pasword --> ...");
            console.log(error);
            return { estado: 0, mensaje: `ERROR INESPERADO - INTENTE NUEVAMENTE` };
        }
    } else {
        return { estado: 0, mensaje: "LogIn error - Intnete nuevamente" };
    }
}

async function registerUser(newUsr){
    const storedUser = await getUser(newUsr.usr);

    if (storedUser == null) {
        try {
            const hash = await bcrypt.hash(newUsr.pwd, 5);
            let inserted = await addUser({ user: newUsr.usr, passwd: hash, age: newUsr.age, mail: newUsr.mail, phone: newUsr.phone });
            if (inserted.status == 0) { return { estado: 0, mensaje: `USUARIO INSERTADO CON EXITO !!\n\nID: ${inserted.id}` }; }
            if (inserted.status == -1) { return { estado: 1, mensaje: `ERROR AL AGREGAR USUARIO !!\n\nINTENTE NUEVAMENTE` }; }
        } catch (error) {
            return { estado: 1, mensaje: `ERROR INESPERADO - INTENTE NUEVAMENTE` };
        }
    } else {
        return { estado: 1, mensaje: `ERROR USUARIO EXISTENTE` };
    }
}

module.exports = { loginUser, registerUser };

