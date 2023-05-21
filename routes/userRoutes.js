const Router = require('express');
const { loginUser, registerUser } = require('../controller/userController.js');

const userRouter = new Router()

userRouter.post('/loginTest', async (req, res) => {
    const usr = req.body.user;
    const pwd = req.body.pass;

    const response = await loginUser(usr, pwd);

    res.json(response);
});

userRouter.post('/registerTest', async (req, res) => {
    const newUsr = {
        usr : req.body.user,
        pwd : req.body.pass,
        age : req.body.age,
        mail : req.body.mail,
        phone : req.body.phone
    };

    const response = await registerUser(newUsr);

    res.json(response);
});

module.exports = { userRouter };