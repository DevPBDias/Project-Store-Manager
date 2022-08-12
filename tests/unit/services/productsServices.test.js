const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('Recebe todos os produtos do BD', () => {

  describe('Quando não existe nenhum produto', () => {
    before(function () {
      sinon.stub(productsModel, 'getAllProducts').resolves([]);
    });

    after(function () {
      productsModel.getAllProducts.restore();
    });

    it('Verifica se retorna um array', async function () {
      const result = await productsService.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('Verifica se o array está vazio', async function () {
      const result = await productsService.getAllProducts();
      expect(result).to.empty;
    });
  });

  describe('Quando existem produtos no BD', () => {
    before(function () {
      sinon.stub(productsModel, 'getAllProducts').resolves([{ id: 1, name: 'Martelo de Thor' }]);
    });

    after(function () {
      productsModel.getAllProducts.restore();
    });

    it('Verifica se retorna um array', async function () {
      const result = await productsService.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('Verifica se o array não está vazio', async function () {
      const result = await productsService.getAllProducts();
      expect(result).to.not.empty;
    });

    it('Verifica se o array possue objetos como itens do array', async function () {
      const result = await productsService.getAllProducts();
      expect(result[0]).to.be.an('object');
    });

    it('Verifica se os objetos possuem as propriedades: "id" e "name"', async function () {
      const result = await productsService.getAllProducts();
      expect(result[0]).to.all.keys('id', 'name');
    });
  });
});