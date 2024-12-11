'use server'
export async function newClient(formData: any) {
  const API_URL = 'http://192.168.196.166:4000/clientes';

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
      message: `Ocorreu um erro: ${resultError.error}.`,
    };
  }

  return {
    status: response.status,
    message: 'Cliente cadastrado com sucesso.',
  };
}

export async function getAllClients() {
  const API_URL = 'http://192.168.196.166:4000/clientes';

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
      message: `Ocorreu um erro: ${resultError.error}.`,
    };
  }

  return {
    status: response.status,
    message: 'Clientes buscados com sucesso.',
    data: await response.json(),
  }
}
