let purchases = []

module.exports = {
    getAll: () => {
        return purchases
    },
    getById: (id) => {
        const purchase = purchases.find(purchase => purchase.id === id)
        return purchase ? purchase[0] : null
    },
    create: (clientId, productId, quantity, totalPrice) => {
        const id = uuidv4()
        const newPurchase = {id, clientId, productId, quantity, totalPrice, status: 'delivered'}
        purchases.push(newPurchase)
        return newPurchase
    },
    update: (id, quantity, totalPrice) => {    
        const index = purchases.findIndex(purchase => purchase.id === id)
        if(index !== -1){
            purchases[index] = {...purchases[index], quantity, totalPrice}
            return purchases[index]
        }
        return null
    },
    changeStatus: (id) => {
        const index = purchases.findIndex(purchase => purchase.id === id)
        if(index !== -1){
            purchases[index] = {...purchases[index], status: 'cancelled'}
            return purchases[index]
        }
        return null
    }
}