const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.TIDB_HOST || process.env.DB_HOST,
    port: process.env.TIDB_PORT || 3306,
    user: process.env.TIDB_USER || process.env.DB_USER,
    password: process.env.TIDB_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.TIDB_DATABASE || process.env.DB_NAME,

    ssl: process.env.TIDB_ENABLE_SSL === "true"
        ? {
            minVersion: "TLSv1.2",
            rejectUnauthorized: true
        }
        : undefined,

    connectionLimit: 1,
    maxIdle: 1,
    enableKeepAlive: true
});

module.exports = db;