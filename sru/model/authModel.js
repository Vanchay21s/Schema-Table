const pool = require('../config/db')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const userModel = require('./userModel')

const authModel = {
    async signUp({username, email, passwordHashed}){
        const result = await pool.query(`
            INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *
        `, [username, email, passwordHashed])
        console.log(result)
        return result.rows
    },
    
    async login({email}){
        const result = await pool.query(`SELECT * FROM users Where email = $1`, [email])
        return result.rows
    },
}

module.exports = authModel