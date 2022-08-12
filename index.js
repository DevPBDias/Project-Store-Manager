const express = require('express');
const app = require('./app');
require('dotenv').config();

app.use(express.json());

const routes = require('./routes');

app.use('/products', routes.productsRoute);
app.use('/products/:id', routes.productsRoute);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
