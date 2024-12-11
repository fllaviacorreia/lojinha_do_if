const { v4: uuidv4 } = require('uuid');

let clients = [];

const getAll = () => {
    return clients;
};

const getById = (id) => {
    const client = clients.find(client => client.id === id);
    return client
};

const getByEmail = (email) => {
    const client = clients.find(client => client.email === email);
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
        clients[index].status = clients[index].status === 'active' ? 'inactive' : 'active';
        return clients[index];
    }

    return null;
};

const update = (id, name, email, bornDate) => {
    const index = clients.findIndex(client => client.id === id);

    if (index !== -1) {
        let actual = clients[index];
        clients[index] = { id, name, email, bornDate, status: actual.status };
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
