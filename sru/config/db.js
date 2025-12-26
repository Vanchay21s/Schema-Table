const {Pool} = require('pg')
require('dotenv').config();

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDB
})

// // Optional: log when connected
// pool.on("connect", () => {
//   console.log("PostgreSQL connected");
// });

// // Optional: handle unexpected errors
// pool.on("error", (err) => {
//   console.error("Unexpected PG error", err);
//   process.exit(-1);
// });

module.exports = pool