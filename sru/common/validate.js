const {checkSchema} = require('express-validator')
const pool = require('../config/db')

const signUpSchame = checkSchema({
    useranme: {
        isLength: {
            optiona: {
                min: 6,
                max: 15
            }
        },
        customSanitizer: {
            option: (value) => value.toLowerCase(),
        },
        custom: {
            option: async (value) =>{
                const users = await pool.query(`SELECT * FROM users WHERE username = $1`, [value])
                if(users.rowsCount > 0){
                    throw new Error(`Username: ${value} already exists`)
                }
            }
        },
    },
    email:{
        inEmail: true,
        customSanitizer: {
            option: (value) => value.toLowerCase(),
        },
        custom: {
            option: async (value) =>{
                const email = await pool.query("Select * from users where email =  $1", [value])
                if(email.rowCount > 0){
                    throw new Error(`Email: ${email} already exists`)
                }
            }
        }
        
    }
})
module.exports = {
    signUpSchame
}