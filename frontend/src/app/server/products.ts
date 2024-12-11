'use server'

import { getLocalIP } from "./utils";

// Use o IP para construir a URL
const LOCAL_IP = getLocalIP();
const API_URL = `http://${LOCAL_IP}:4000/produtos`;

export async function newProduct(formData: any) {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      name: formData.get('name'),
      brand: formData.get('description'),
      price: formData.get('price'),
      stock: formData.get('stock'),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const resultError = await response.json();
    return {
      status: response.status,
      message: resultError.message
    };
  }

  return {
    status: response.status,
    message: 'Cliente cadastrado com sucesso.',
  };
}

export async function getAllProducts() {

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const resultError = await response.json();
    return {
      status: response.status,
      message: resultError.error
    };
  }

  return {
    status: response.status,
    message: 'Produtos buscados com sucesso.',
    data: await response.json(),
  }
}

export async function updateProduct(id: string, formData: any) {
  const response = await fetch(API_URL+`/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        name: formData.get('name'),
        brand: formData.get('description'),
        price: formData.get('price'),
        stock: formData.get('stock'),
      }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const resultError = await response.json();
    console.log(resultError)
    return {
      status: response.status,
      message: resultError.message
    };
  }

  return {
    status: response.status,
    message: 'Produto atualizado com sucesso.',
  }
}

export async function changeStatus(id: string) {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const resultError = await response.json();
    return {
      status: response.status,
      message: resultError.error,
    };
  }

  return {
    status: response.status,
    message: 'Produto atualizado com sucesso.',
  }
}
