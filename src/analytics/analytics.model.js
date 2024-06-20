import db from '../core/database/connection.js'

export const getCountProducts = async () => {
    return await db.products.findMany({
        select: {
            quantity: true
        }
    })
}

export const getCountSales = async () => {
    return await db.sales.count()
}

export const getPriceSales = async () => {
    return await db.sales.findMany({
        select: {
            total_price: true
        }
    })
}

export const getCountCustomers = async () => {
    return await db.providers.count()
}
