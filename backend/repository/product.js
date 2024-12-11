let products = [];

const getAllProducts = () => {
  return products;
};

const getOneProduct = (id) =>{
  const product = products.find(product => product.id === id);

  return product ? product[0] : null;
}

const create = (name, brand, price, stock) => {
  const product = {
    id: uuidv4(),
    name,
    brand,
    price,
    stock
  }

  products.push(product);
  return product;
}

const update = (id, updates) => {
  const index = products.findIndex(product => product.id === id);

  if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      return products[index];
  }
  
  return null;
};

const changeStatus = (id) => {
  const index = products.findIndex(product => product.id === id);

  if (index !== -1) {
      products[index].status = products[index].status === 'active' ? 'inactive' : 'active';
      return products[index];
  }

  return null;
};

module.exports = {
  getAllProducts,
  getOneProduct,
  create,
  update,
  changeStatus
};