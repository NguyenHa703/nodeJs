const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Nodejs-WD18201'
        );
        console.log('Connect successdully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}
module.exports = { connect }