const purchaseRepository = require('../repository/purchases')
const clientService = require('./client')
const productService = require('./product')

const getAll = () => {
    let purchases = purchaseRepository.getAll()

    const result = purchases.map(purchase => {
        const client = clientService.getById(purchase.clientId)
        const product = productService.getById(purchase.productId)
        return {
            ...purchase,
            client,
            product
        }
    })

    return result
}

const create = (clientId, productId, quantity) => {
    const client = clientService.getById(clientId)
    const product = productService.getById(productId)

    if(!client){
        return {message: "Cliente nao encontrado."}
    }

    if(!product){
        return {message: "Produto nao encontrado."}
    }

    if(quantity <= 0 || quantity > product.stock){
        return {message: "Quantidade invalida."}
    }

    const totalPrice = product.price * quantity

    productService.update(
        {
            ...product,
            stock: product.stock - quantity
        }
    )

    return purchaseRepository.create(clientId, productId, quantity, totalPrice)
}

const update = (id, quantity) => {
    const purchase = purchaseRepository.getById(id)

    if(!purchase){
        return {message: "Compra nao encontrada."}
    }

    if(quantity <= 0 || quantity > purchase.product.stock){
        return {message: "Quantidade invalida."}
    }

    const totalPrice = purchase.product.price * quantity

    return purchaseRepository.update(id, quantity, totalPrice)
}

const changeStatus = (id) => {
    const purchase = purchaseRepository.getById(id)

    if(!purchase){
        return {message: "Compra nao encontrada."}
    }

    const product = productService.getById(purchase.productId)

    productService.update(
        {
            ...product,
            stock: product.stock + purchase.quantity
        }
    )

    return purchaseRepository.changeStatus(id)
}

module.exports = {
    getAll,
    create,
    update,
    changeStatus
}