const purchasesService = require('../service/purchases')
const { update } = require('./client')

module.exports = {
    getAll: () => {
        return purchasesService.getAll()
    },
    create: (clientId, productId, quantity) => {
        return purchasesService.create(clientId, productId, quantity)
    },
    update: (id, quantity) => {
        return purchasesService.update(id, quantity)
    },
    changeStatus: (id) => {
        return purchasesService.changeStatus(id)
    }
}
