const express = require('express')

const purchasesController = require('../controller/purchases')

const buyRouter = express.Router();

buyRouter.get("", (req, res) => {
    try{
        const purchases = purchasesController.getAll()

        return res.status(200).json(purchases)

    } catch (e) {

        return res.status(500).json({message: "Erro ao buscar todas as compras."})
    }
})


module.exports = buyRouter;