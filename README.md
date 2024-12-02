# API de Gerenciamento de Produtos
## Descrição

A API de Gerenciamento de Produtos é um serviço backend para gerenciar produtos, incluindo funcionalidades de criação, leitura, atualização e exclusão (CRUD). 
A API permite a integração com sistemas front-end para gerenciar dados relacionados a produtos de forma eficiente.

## Recursos

- Gerenciar produtos:
   - Criar um novo produto.
   - Listar todos os produtos.
   - Atualizar informações de um produto.
   - Remover um produto.
- Documentação clara e organizada.
- Validação de dados de entrada.

## Pré-requisitos

    Node.js: >= 14.x
    
    npm: >= 6.x
    
    Banco de Dados: MongoDB, MySQL, ou outro banco configurado (dependendo da implementação).
    
    Ferramentas recomendadas: Postman ou Insomnia para testar os endpoints.

## Instalação

### Clone o repositório:

```
git clone https://github.com/fllaviacorreia/api-produtos.git

cd api-produtos
```

### Instale as dependências:

```
npm install
```

### Configure o ambiente:

Crie um arquivo .env na raiz do projeto:
```
touch .env
```
    
Adicione as seguintes variáveis:

 PORT=3000
  
Inicie o servidor:
```
npm start

```
## Endpoints
Base URL

http://localhost:3000

### Produtos
#### 1. Listar todos os produtos

    GET /produtos
    Resposta:

    {
      "data": [
        {
          "id": "1",
          "name": "Produto A",
          "brand": "Brand C",
          "price": 50.0,
          "stock": 100
        },
        ...
      ]
    }

#### 2. Buscar produto por ID

    GET /produtos/:id
    Parâmetro:
        id: ID do produto a ser buscado.
    Resposta:

        {
          "data": {
            "id": "1",
            "name": "Produto A",
            "brand": "Brand C",
            "price": 50.0,
            "stock": 100
          }
        }

#### 3. Criar um novo produto

    POST /produtos
    Body:

        {
          "name": "Produto B",
          "brand": "Brand A",
          "price": 70.0,
          "stock": 50
        }

Resposta:

        {
          "message": "Produto criado com sucesso!",
          "data": {
            "id": "2",
            "name": "Produto B",
            "brand": "Brand A",
            "price": 70.0,
            "stock": 50
          }
        }

#### 4. Atualizar um produto

    PUT /produtos/:id
    Parâmetro:
        id: ID do produto a ser atualizado.
    Body:

        {
          "price": 60.0,
          "stock": 80
        }

Resposta:

        {
          "message": "Produto atualizado com sucesso!",
          "data": {
            "id": "1",
            "name": "Produto A",
            "brand": "Brand C",
            "price": 60.0,
            "stock": 80
          }
        }

#### 5. Deletar um produto

    DELETE /produtos/:id

   Parâmetro:
        id: ID do produto a ser deletado.

    Resposta:

        {
          "message": "Produto deletado com sucesso!"
        }

## Estrutura do Projeto

        api-produtos/
        ├── controller/
        │   └── product.js
        ├── repository/
        │   └── product.js
        ├── service/
        │   └── product.js
        ├── route/
        │   └── product.js
        ├── server.js
        ├── package.json
        └── README.md

## Tecnologias Utilizadas

- Node.js: Plataforma backend.
- Express.js: Framework para criação de APIs.
- Nodemon: Framework para atualizações automáticas no servidor.
- UUID: para gerar IDs

## Melhorias Futuras

- Implementação de autenticação (JWT).
- Paginação para listagem de produtos.
- Integração com outras APIs.
- Validação de entrada mais robusta (ex: usando Joi ou Yup).

## Contribuição

Faça um fork do repositório.

Crie uma branch para sua feature ou correção:

      git checkout -b minha-feature

Faça o commit das suas alterações:

      git commit -m "Minha feature ou correção"

Envie para o repositório remoto:

    git push origin minha-feature

Abra um Pull Request.

## Licença

Este projeto é licenciado sob a MIT License.

Pronto! 🎉 A API está configurada e pronta para uso!
