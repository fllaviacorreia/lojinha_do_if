import { getAll as _getAll, getById as _getById, create as _create, update as _update, changeStatus as _changeStatus } from '../service/product.js';

const getAll = async (req, res) => {
    const { id: vendorId } = req.user;

    const products = await _getAll(vendorId);
    return res.json(products);
};

const getById = async (req, res) => {
    const { id: vendorId } = req.user;
    const { id } = req.params;

    const product = await _getById(Number(id), vendorId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    return res.json(product);
};

const create = async (req, res) => {
    const { id: vendorId } = req.user;
    const { name, brand, price, stock } = req.body;

    const product = await _create({ name, brand, price, stock }, vendorId);
    return res.status(201).json(product);
};

const update = async (req, res) => {
    const { id: vendorId } = req.user;
    const { id } = req.params;
    const { name, brand, price, stock } = req.body;

    const product = await _update(Number(id), { name, brand, price, stock }, vendorId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    return res.json(product);
};

const changeStatus = async (req, res) => {
    const { id: vendorId } = req.user;
    const { id } = req.params;

    const product = await _changeStatus(Number(id), vendorId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    return res.json(product);
};

export {
    getAll,
    getById,
    create,
    update,
    changeStatus
};
