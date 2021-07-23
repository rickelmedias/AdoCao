require('dotenv').config();
const mysql     = require('mysql2');

const db = {
    USER: process.env.MYSQL_USER,
    PASS: process.env.MYSQL_PASS,
    DATB: process.env.MYSQL_DATB,
    HOST: process.env.MYSQL_HOST,
    PORT: process.env.MYSQL_PORT
};

const pool = mysql.createPool ({
        "user"      : db.USER,
        "password"  : db.PASS,
        "database"  : db.DATB,
        "host"      : db.HOST,
        "port"      : db.PORT
});

exports.pool = pool;