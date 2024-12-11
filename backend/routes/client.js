const express = require('express');
const clientController = require('../controller/client.js');
const clientRouter = express.Router();

// Rota para obter todos os clientes
clientRouter.get("", (req, res) => {
    try {
        const clients = clientController.getAll();
        return res.status(200).json(clients);
    } catch (e) {
        return res.status(500).json({ message: "Erro ao buscar todos os clientes." });
    }
});

// Rota para criar um novo cliente
clientRouter.post("", (req, res) => {
    try {
        return clientController.create(req, res);
    } catch (e) {
        return res.status(500).json({ message: "Erro ao cadastrar cliente." });
    }
});

// Rota para inativar um cliente
clientRouter.patch("/:id/status", (req, res) => {
    try {
        const { id } = req.params;
        const result = clientController.changeStatus(id);
        if (!result || result.message) {
            return res.status(404).json({ message: "Cliente nao encontrado." });
        }
        return res.status(200).json({ message: "Cliente inativado com sucesso.", result });
    } catch (e) {
        return res.status(500).json({ message: "Erro ao inativar o cliente." });
    }
});

// Rota para atualizar parcialmente um cliente
clientRouter.patch("/:id", (req, res) => {
    try {
        return clientController.update(req, res);
    } catch (e) {
        return res.status(500).json({ message: "Erro ao atualizar o cliente." + e.message });
    }
});

module.exports = clientRouter;
