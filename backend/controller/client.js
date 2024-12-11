const clientService = require('../service/client')

const getAll = () => {
    return clientService.getAll()
}

const create = (req, res) => {
    return clientService.create(req, res)
}

const changeStatus = (id) => {
    return clientService.changeStatus(id)
}

const update = (req, res) => {
    return clientService.update(req, res)
}

module.exports = {
    getAll,
    create,
    changeStatus,
    update
}