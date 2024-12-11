const express = require('express');
const productController = require('../controller/product');

const productRouter = express.Router();

productRouter.get('/', (req, res) => {
    try {
        const products = productController.getAllProducts();
        console.log(products)
        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ message: "Erro ao buscar todos os produtos.", details: e.message })
    }
});

productRouter.post('/', (req, res) => {
    try {
        const { name, brand, price, stock } = req.body
        const product = productController.createProduct(name, brand, price, stock);

        if(product.message){
            return res.status(404).json({ message: product.message })
        } else {
            return res.status(201).json({
                message: "Produto cadastrado com sucesso.",
                data: product
            })
        }
    } catch (e) {
        return res.status(500).json({ message: "Erro ao cadastrar produto.", details: e.message })
    }
});

productRouter.patch('/:id', (req, res) => {
    try {
        const { id } = req.params
        const { name, brand, price, stock } = req.body
        const product = productController.updateProduct(id, name, brand, price, stock);
        return product 
                ?
                    res.status(200).json({
                        message: "Produto atualizado com sucesso.",
                        data: product
                    })
                : res.status(404).json({ message: "Produto nao encontrado." })
    } catch (e) {
        return res.status(500).json({ message: "Erro ao atualizar produto.", details: e.message })
    }
});

productRouter.patch('/:id/status', (req, res) => {
    try {
        const { id } = req.params
        const product = productController.changeProductStatus(id);
        return product 
                ?
                    res.status(200).json({
                        message: "Produto atualizado com sucesso.",
                        data: product
                    })
                : res.status(404).json({ message: "Produto nao encontrado." })
    } catch (e) {
        return res.status(500).json({ message: "Erro ao atualizar produto.", details: e.message })
    }
});

module.exports = productRouter;