const productRepository = require('../repository/product');

const getAllProducts = () => {
    const products = productRepository.getAllProducts();

    if (!products || products.length === 0) {
        return {message: "Nenhum produto cadastrado"};
    }

    return products;
};

const getOneProduct = (id) => {
    return productRepository.getOneProduct(id);
}

const create = (name, brand, price, stock) => {
    return productRepository.create(name, brand, price, stock);
}

const update = (id, name, brand, price, stock) => {
    return productRepository.update(id, name, brand, price, stock);
}

const changeStatus = (id) => {
    return productRepository.changeStatus(id);
}

module.exports = {
    getAllProducts,
    getOneProduct,
    create,
    update,
    changeStatus
};