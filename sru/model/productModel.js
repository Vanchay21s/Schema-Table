const pool = require("../config/db")


const productModel = {
    async filter({brand, category}) {
        const product = await pool.query(`
            Select 
            p.id,
            p.name,
            p.price,
            p.qty,
            b.name as brands,
            c.name as categories 
            from products p
            join brands b on p.by_brand = b.id
            join categories c on p.by_category = c.id
            Where 
                ($1::text is null or lower(b.name) = lower($1))
            and
                ($2::text is null or lower(c.name) = lower($2))
        `, [brand || null, category || null])
        return product.rows
    }
}

module.exports = productModel