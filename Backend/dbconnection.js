const mysql = require('mysql2');

const config = {
    host:'localhost',
    user:'root',
    password:'Jutt@001///',
    database:'Ecommerce',
}

const dbconnection = mysql.createPool(config);

module.exports = dbconnection.promise()



