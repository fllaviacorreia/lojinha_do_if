import { getAll as _getAll, getById as _getById, create as _create, update as _update, changeStatus as _changeStatus } from '../service/client.js';

const getAll = async (req, res) => {
    const { id: vendorId } = req.user;

    const clients = await _getAll(vendorId);
    return res.json(clients);
};

const getById = async (req, res) => {
    const { id: vendorId } = req.user;
    const { id } = req.params;

    const client = await _getById(Number(id), vendorId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    return res.json(client);
};

const create = async (req, res) => {
    const { id: vendorId } = req.user;
    const { name, email } = req.body;

    if (!name || !email || !req.body.bornDate) {
        return res.status(400).json({ message: 'Name, email, and bornDate are required' });
    }
    const bornDate = new Date(req.body.bornDate);

    const client = await _create({ name, email, bornDate }, vendorId);
    return res.status(201).json(client);
};

const update = async (req, res) => {
    const { id: vendorId } = req.user;
    const { id } = req.params;
    const { name, email } = req.body;

    const bornDate = new Date(req.body.bornDate);

    const client = await _update(Number(id), { name, email, bornDate }, vendorId);

    if (!client) return res.status(404).json({ message: 'Client not found' });

    return res.json(client);
};

const changeStatus = async (req, res) => {
    const { id: vendorId } = req.user;
    const { id } = req.params;

    const client = await _changeStatus(Number(id), vendorId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    return res.json(client);
};

export {
    getAll,
    getById,
    create,
    update,
    changeStatus
};
