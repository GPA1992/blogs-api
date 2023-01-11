# Blogs-API

O projeto Blogs-API é uma aplicação CRUD de um blog, desenvolvida com as seguintes tecnologias:
- Node.js
- Express
- Sequelize
- JSON Web Token para autenticação
- MySQL
- Docker

O objetivo desse projeto era aplicar o conceito de arquitetura de software MSC (Módulo, Serviço e Controlador) e praticar o desenvolvimento de aplicações com essas tecnologias. Durante o projeto, foram criados módulos, serviços e controladores para gerenciar as operações de criação, leitura, atualização e exclusão de blogs e implementada a autenticação com JSON Web Token.

## Instalação

1. Faça um clone desse repositório
2. Entre na pasta do projeto: `cd blogs-api`
3. Inicie os serviços node e db com o comando: `docker-compose up -d --build`
4. Lembre-se de parar o mysql se estiver usando localmente na porta padrão (3306), ou adapte, caso queria fazer uso da aplicação em containers
5. Esses serviços irão inicializar um container chamado blogs_api e outro chamado blogs_api_db
6. Use o comando `docker exec -it blogs_api bash` para acessar o container do node
7. Instale as dependências com `npm install`
8. Para deletar o banco de dados, use o comando: "drop": "npx sequelize-cli db:drop"
9. Para criar o banco e gerar as tabelas, use o comando: "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
10. Para inserir dados/popular a tabela, use o comando: "seed": "npx sequelize-cli db:seed:all"

## Documentação da API
A documentação da API está disponível no endereço `http://localhost:3000/api-docs/`

## Contribuição

Sinta-se à vontade para fazer pull requests e contribuir com o projeto. Algumas áreas que sempre precisam de ajuda são:

- Adição de novas funcional
