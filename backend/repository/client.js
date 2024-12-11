const { v4: uuidv4 } = require('uuid');

let clients = [];

const getAll = () => {
    return clients;
};

const getById = (id) => {
    const client = clients.find(client => client.id === id);
    return client ? client[0] : null;
};

const getByEmail = (email) => {
    const client = clients.find(client => client.email === email)[0];
    return client;
};

const create = (name, email, bornDate) => {
    const client = {
        id: uuidv4(),
        name,
        email,
        bornDate,
        status: 'active'
    };

    clients.push(client);
    return client;
};

const changeStatus = (id) => {
    const index = clients.findIndex(client => client.id === id);

    if (index !== -1) {
        clients[index].status = 'inactive';
        return clients[index];
    }

    return null;
};

const update = (id, updates) => {
    const index = clients.findIndex(client => client.id === id);

    if (index !== -1) {
        clients[index] = { ...clients[index], ...updates };
        return clients[index];
    }
    
    return null;
};

module.exports = {
    getAll,
    getById,
    create,
    getByEmail,
    changeStatus,
    update
};
