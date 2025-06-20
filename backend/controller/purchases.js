import { getAll as _getAll, getById as _getById, create as _create, changeStatus as _changeStatus } from '../service/purchases.js';

const getAll = async (req, res) => {
    const { id: vendorId } = req.user;

    const purchases = await _getAll(vendorId);
    return res.json(purchases);
};

const getById = async (req, res) => {
    const { id: vendorId } = req.user;
    const { id } = req.params;

    const purchase = await _getById(Number(id), vendorId);
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });

    return res.json(purchase);
};

const create = async (req, res) => {
    const { id: vendorId } = req.user;
    const { clientId, items } = req.body;
    /**
     * items = [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 1 }]
     */

    if (!clientId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Invalid request data' });
    }

    const purchase = await _create(clientId, items, vendorId);
    return res.status(201).json(purchase);
};

const changeStatus = async (req, res) => {
    const { id: vendorId } = req.user;
    const { id } = req.params;
    const { status, returnProducts } = req.body;

    const purchase = await _changeStatus(Number(id), vendorId, status, returnProducts);
    
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });

    return res.json(purchase);
};

export {
    getAll,
    getById,
    create,
    changeStatus
};
