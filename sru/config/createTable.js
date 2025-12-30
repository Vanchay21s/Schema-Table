const pool = require("../config/db")

const createTable = async ()=>{
    try {
        await pool.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                SELECT 1 FROM pg_type WHERE typname = 'user_role'
                ) THEN
                CREATE TYPE user_role AS ENUM ('user', 'admin', 'edit');
                END IF;
            END$$;

            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                age VARCHAR(255),
                role user_role DEFAULT 'user',
                password VARCHAR(300) NOT NULL,
                createdDate TIMESTAMP DEFAULT NOW()
            );
            
            CREATE TABLE IF NOT EXISTS brands(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                createdDate TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS categories(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                createdDate TIMESTAMP DEFAULT NOW()
            );
            
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                barcode VARCHAR(300) NULL,
                name VARCHAR(400) NULL,
                price DECIMAL(10, 2) NOT NULL,
                qty DECIMAL(10, 2) NULL,
                by_category int NOT NULL,
                by_brand int NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                FOREIGN KEY (by_category) REFERENCES categories(id),
                FOREIGN KEY (by_brand) REFERENCES brands(id)
            );
        `)
        console.log("Table Hello created")
    } catch (error) {
        console.log("Error creating Tables", error)
    }
}
module.exports = createTable
