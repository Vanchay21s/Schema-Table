const express = require("express");
const app = express()
require("dotenv").config()
const pool = require("./sru/config/db");
const createTable = require("./sru/config/createTable");
const { logger, errorHandler } = require("./sru/middleware/middleware");
const authRouter = require("./sru/routes/authRoute");
const bodyParser = require("body-parser");
const userRouter = require("./sru/routes/userRoute");
// ================


// Optional: Test DB connection when app loads
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database is connected!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();
createTable() //===> Create Table for PostgreSQL automatic
const port = process.env.server_port

app.use(bodyParser.json())
app.use(logger)
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`Server running => http://localhost:${port}/`)
})