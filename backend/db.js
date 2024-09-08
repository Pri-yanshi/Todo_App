const mongoose= require('mongoose');
require('dotenv').config();

const mongodbUrl=process.env.MONGODB_URL_LOCAL;
mongoose.connect(mongodbUrl).then(console.log('mongodb connected...'));
const db = mongoose.connection;

module.exports =db