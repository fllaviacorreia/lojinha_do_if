const clientRepository = require('../repository/client')

const getAll = () => {
    const clients = clientRepository.getAll()

    if(clients.length === 0){
        return {message: "Nenhum cliente cadastrado."}
    }

    return clients
}

const getById = (id) => {
    const client = clientRepository.getById(id)

    if(!client){
        return {message: "Cliente nao encontrado"}
    }

    return client
}

const create = (req, res) =>{
    const {name, email, bornDate} = req.body
    
    const min = 15
    

    if (!testEmail(email)) {
        return res.status(400).json({ error: "E-mail inválido" });
    }

    if (!testDate(bornDate, min)) {
        return res.status(400).json({ error: `Cliente precisa possuir no mínimo ${min} anos.` });
    }

    const existingClient = clientRepository.getByEmail(email);

    if(existingClient){
        return res.status(400).json({error: "Email já vinculado a outro cliente"})
    }

    const result = clientRepository.create(name, email, bornDate)

    return res.status(201).json({
        message: "Cliente cadastrado com sucesso.",
        data: result
    })
}

const changeStatus = (id) => {
    const client = clientRepository.getById(id)

    if(!client){
        return {message: "Cliente nao encontrado"}
    }

    return clientRepository.changeStatus(id)
}

const update = (req, res) => {
    const {id} = req.params
    const {name, email, bornDate} = req.body

    const client = clientRepository.getById(id)

    if(!client){
        return res.status(404).json({message: "Cliente nao encontrado"})
    }

    return clientRepository.update(id, name, email, bornDate)
}


function testEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //REGEX
    return emailRegex.test(email);
}

function testDate(date, min) {
    const atualDate = new Date();
    const birthDate = new Date(date);
    return atualDate.getFullYear() - birthDate.getFullYear() >= min;
}

module.exports = {
    getAll,
    getById,
    create,
    changeStatus,
    update
}