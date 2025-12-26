const pool = require('../config/db')

const userModel = {
    async findAll({limit, page}){
        const offset = (page - 1) * limit;
        const users = await pool.query(`
            SELECT * FROM users
            ORDER BY createddate DESC
            LIMIT $1 OFFSET $2    
        `, [limit, offset])
        const countUser = await pool.query(`
            SELECT COUNT(*) FROM users
        `)
        console.log(users.rows[0])
        const totalUser = Number(countUser.rows[0].count)
        return {
            users: users.rows[0],
            totalUser: totalUser
        }
    },
    
    async findByOne(id){
        console.log("UserModel.FindById", id)
        const result = await pool.query(`SELECT * FROM users Where id = $1`, [id])
        console.log("Success Query")
        return result.rows
    },

    async findByEmail({email}){
        console.log("UserModel.findByEmail", email)
        const result = await pool.query(`SELECT * FROM users Where email = $1`, [email])
        console.log("Success Query findByEmail")
        return result.rows
    }
    
}

module.exports = userModel