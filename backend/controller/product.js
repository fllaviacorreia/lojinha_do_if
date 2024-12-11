const productService = require("../service/product")

const getAllProducts = () => {
    return productService.getAllProducts();
}

const getOneProduct = (id) => {
   return productService.getOneProduct(id);
}

const create = (name, brand, price, stock) => {
    return productService.create(name, brand, price, stock);
}

const update = (id, name, brand, price, stock) => {
    return productService.update(id, name, brand, price, stock);
}

const changeStatus = (id) => {
    return productService.changeStatus(id);
}


module.exports = {
    getAllProducts,
    getOneProduct,
    create,
    update,
    changeStatus
};