const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

describe('1 - Recebe todos os produtos do BD', () => {

  describe('1.1 - Quando não existe nenhum produto', () => {
    before(function () {
      sinon.stub(salesModel, 'getAllSales').resolves([]);
    });

    after(function () {
      salesModel.getAllSales.restore();
    });

    it('Verifica se retorna um array', async function () {
      const result = await salesService.getAllSales();
      expect(result).to.be.an('array');
    });

    it('Verifica se o array está vazio', async function () {
      const result = await salesService.getAllSales();
      expect(result).to.empty;
    });
  });

  describe('1.2 - Quando existem produtos no BD', () => {
    before(function () {
      const mock = {
        "saleId": 1,
        "date": "2022-08-17T12:12:54.000Z",
        "productId": 2,
        "quantity": 10
      };
      sinon.stub(salesModel, 'getAllSales').resolves([mock]);
    });

    after(function () {
      salesModel.getAllSales.restore();
    });

    it('Verifica se retorna um array', async function () {
      const result = await salesService.getAllSales();
      expect(result).to.be.an('array');
    });

    it('Verifica se o array não está vazio', async function () {
      const result = await salesService.getAllSales();
      expect(result).to.not.empty;
    });

    it('Verifica se o array possue objetos como itens do array', async function () {
      const result = await salesService.getAllSales();
      expect(result[0]).to.be.an('object');
    });

    it('Verifica se os objetos possuem as todas as propriedades', async function () {
      const result = await salesService.getAllSales();
      expect(result[0]).to.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('2 - Recebe todos os produtos por id do BD', () => {

  describe('2.1 - Quando não existe nenhum produto', () => {
    before(function () {
      sinon.stub(salesModel, 'getSalesById').resolves([]);
    });

    after(function () {
      salesModel.getSalesById.restore();
    });

    it('Verifica se retorna um array', async function () {
      const result = await salesService.getSalesById(1);
      expect(result).to.be.null;
    });
  });

  describe('2.2 - Quando existem produtos por id no BD', () => {
    before(function () {
      const mock = {
        "date": "2022-08-17T12:12:54.000Z",
        "productId": 2,
        "quantity": 10
      };
      sinon.stub(salesModel, 'getSalesById').resolves([mock]);
    });

    after(function () {
      salesModel.getSalesById.restore();
    });

    it('Verifica se retorna um objeto', async function () {
      const result = await salesService.getSalesById(1);
      expect(result[0]).to.be.an('object');
    });

    it('Verifica se o array não está vazio', async function () {
      const result = await salesService.getSalesById(1);
      expect(result).to.not.empty;
    });

    it('Verifica se o array possue objetos como itens do array', async function () {
      const result = await salesService.getSalesById(1);
      expect(result[0]).to.be.an('object');
      expect(result[1]).to.be.undefined;
    });

    it('Verifica se os objetos possuem as propriedades: "id" e "name"', async function () {
      const result = await salesService.getSalesById(1);
      expect(result[0]).to.all.keys('date', 'productId', 'quantity');
    });
  });
});

