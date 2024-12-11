'use server'

import { getLocalIP } from "./utils";

// Use o IP para construir a URL
const LOCAL_IP = getLocalIP();
const API_URL = `http://${LOCAL_IP}:4000/clientes`;

export async function newClient(formData: any) {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
      bornDate: formData.get('bornDate'),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response);

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

export async function getAllClients() {

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
    message: 'Clientes buscados com sucesso.',
    data: await response.json(),
  }
}

export async function updateClient(id: string, formData: any) {
  const response = await fetch(API_URL+`/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
      bornDate: formData.get('bornDate'),
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
    message: 'Cliente atualizado com sucesso.',
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
    message: 'Cliente atualizado com sucesso.',
  }
}
