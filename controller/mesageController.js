const { searchMessages, insertMessage, searchAuthorMessages } = require('../dao/messageDao.js');

function getTime() {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime;
}

async function getMessages(){
    const messages = await searchMessages();
    console.log(messages);
}

async function getMessagesByAutor(autor){
    const messages = await searchAuthorMessages(autor);
    console.log(messages);
}

async function saveMessage(message){
    const now = getTime();
    const newMsg = { timestamp: now, ...message };

    const messages = await insertMessage(newMsg);
    console.log(messages);
}

module.exports = { getMessages, getMessagesByAutor, saveMessage };