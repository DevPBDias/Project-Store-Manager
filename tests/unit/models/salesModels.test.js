const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require('../../../models/connectionProducts');
const salesModel = require('../../../models/salesModel');


describe('1 - Recebe todos os produtos do BD', () => {

  describe('1.1 - Quando não existe nenhum produto', () => {
    before(function () {
      const resultadoExecute = [[], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });

    after(function () {
      connection.execute.restore();
    });

    it('Verifica se retorna um array', async function () {
      const result = await salesModel.getAllSales();
      expect(result).to.be.an('array');
    });

    it('Verifica se o array está vazio', async function () {
      const result = await salesModel.getAllSales();
      expect(result).to.be.empty;
    });
  });

  describe('1.2 - Quando existem produtos no BD', () => {
    const mock = [
      {
        "saleId": 1,
        "date": "2022-08-17T12:12:54.000Z",
        "productId": 2,
        "quantity": 10
      },
      {
        "saleId": 2,
        "date": "2022-08-17T12:12:54.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];
    before(function () {
      const resultadoExecute = [mock, []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });

    after(() => {
      sinon.restore();
    })

    it('Verifica se retorna um array', async function () {
      const resultado = await salesModel.getAllSales();
      expect(resultado).to.be.an('array');
    });

    it('Verifica se o array não está vazio', async function () {
      const result = await salesModel.getAllSales();
      expect(result).to.be.not.empty;
    });

    it('Verifica se o array possue objetos como itens do array', async function () {
      const result = await salesModel.getAllSales();
      expect(result[0]).to.be.an('object');
    });

    it('Verifica se os objetos possuem todas as propriedades', async function () {
      const result = await salesModel.getAllSales();
      const item = result[0];
      expect(item).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('2 - Recebe o produto por id pelo BD', () => {

  describe('2.1 - Quando não existe nenhum produto', () => {

    before(function () {
      const resultadoExecute = [[], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });

    after(function () {
      connection.execute.restore();
    });

    it('Verifica se retorna um array', async function () {
      const result = await salesModel.getSalesById(1);
      expect(result).to.be.an('array');
    });
  });

  describe('2.2 - Quando existem produtos no BD', () => {
    const mock = {
      "date": "2022-08-17T12:12:54.000Z",
      "productId": 2,
      "quantity": 10
    };

    before(function () {
      const resultadoExecute = [mock, []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });

    after(() => {
      sinon.restore();
    })

    it('Verifica se retorna um objeto', async function () {
      const resultado = await salesModel.getSalesById(1);
      expect(resultado).to.be.an('object');
    });

    it('Verifica se o array não está vazio', async function () {
      const result = await salesModel.getSalesById(1);
      expect(result).to.be.not.empty;
    });

    it('Verifica se o array possue objetos como itens do array', async function () {
      const result = await salesModel.getSalesById(1);
      expect(result).to.be.an('object');
    });

    it('Verifica se os objetos possuem todas as propriedades', async function () {
      const result = await salesModel.getSalesById(1);
      expect(result).to.include.all.keys('date', 'productId', 'quantity');
    });
  });

});