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

buyRouter.post("", (req, res) => {
    try{
        const {clientId, productId, quantity} = req.body

        const purchase = purchasesController.create(clientId, productId, quantity)

        if(purchase.message){
            return res.status(404).json({message: purchase.message})
        } else {
            return res.status(201).json({
                message: "Compra realizada com sucesso.",
                data: purchase
            })
        }
    } catch (e) {
        return res.status(500).json({message: "Erro ao realizar compra.", details: e.message})
    }
})

buyRouter.patch("/:id", (req, res) => {
    try{
        const {id} = req.params
        const {quantity} = req.body

        const purchase = purchasesController.update(id, quantity)

        if(purchase.message){
            return res.status(404).json({message: purchase.message})
        } else {
            return res.status(200).json({
                message: "Compra atualizada com sucesso.",
                data: purchase
            })
        }
    } catch (e) {
        return res.status(500).json({message: "Erro ao atualizar compra.", details: e.message})
    }
})

buyRouter.patch("/:id/status", (req, res) => {
    try{
        const {id} = req.params

        const purchase = purchasesController.changeStatus(id)

        if(purchase.message){
            return res.status(404).json({message: purchase.message})
        } else {
            return res.status(200).json({
                message: "Compra atualizada com sucesso.",
                data: purchase
            })
        }
    } catch (e) {
        return res.status(500).json({message: "Erro ao atualizar compra.", details: e.message})
    }
})

module.exports = buyRouter;