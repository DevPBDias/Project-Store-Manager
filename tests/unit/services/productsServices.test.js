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
      const mock = { id: 1, name: 'Martelo de Thor' }
      sinon.stub(productsModel, 'getAllProducts').resolves([mock]);
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

describe('Recebe todos os produtos por id do BD', () => {

  describe('Quando não existe nenhum produto', () => {
    before(function () {
      sinon.stub(productsModel, 'getProductById').resolves([]);
    });

    after(function () {
      productsModel.getProductById.restore();
    });

    it('Verifica se retorna um array', async function () {
      const result = await productsService.getProductById(1);
      expect(result).to.be.an('array');
    });

    it('Verifica se o array está vazio', async function () {
      const result = await productsService.getProductById(1);
      expect(result).to.empty;
    });
  });

  describe('Quando existem produtos por id no BD', () => {
    before(function () {
      const mock = { id: 1, name: 'Martelo de Thor' }
      sinon.stub(productsModel, 'getProductById').resolves([mock]);
    });

    after(function () {
      productsModel.getProductById.restore();
    });

    it('Verifica se retorna um objeto', async function () {
      const result = await productsService.getProductById(1);
      expect(result[0]).to.be.an('object');
    });

    it('Verifica se o array não está vazio', async function () {
      const result = await productsService.getProductById(1);
      expect(result).to.not.empty;
    });

    it('Verifica se o array possue objetos como itens do array', async function () {
      const result = await productsService.getProductById(1);
      expect(result[0]).to.be.an('object');
      expect(result[1]).to.be.undefined;
    });

    it('Verifica se os objetos possuem as propriedades: "id" e "name"', async function () {
      const result = await productsService.getProductById(1);
      expect(result[0]).to.all.keys('id', 'name');
    });
  });

  describe('Cadastro de novos produtos do BD', () => {

    describe('Quando existe um novo produto', () => {
      before(function () {
        const mock = {
          "id": 4,
          "name": "ProdutoX"
        };
        sinon.stub(productsModel, 'addProduct').resolves(mock);
      });

      after(function () {
        productsModel.addProduct.restore();
      });

      it('Verifica se retorna um objeto', async function () {
        const result = await productsService.addProduct("ProdutoX");
        expect(result).to.be.an('object');
      });

      it('Verifica se o objeto não está vazio', async function () {
        const result = await productsService.addProduct("ProdutoX");
        expect(result).to.be.not.empty;
      });

      it('Verifica se os objetos possuem as propriedades: "id" e "name"', async function () {
        const result = await productsService.addProduct("ProdutoX");
        expect(result).to.include.all.keys('id', 'name');
      });
    });
  });

  describe('Altera produtos do BD', () => {

    describe('Quando altera um produto', () => {
      const changeMock = {
        "id": "1",
        "name": "Martelo do Batman"
      };
      const mock = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      before(function () {
        sinon.stub(productsModel, 'getAllProducts').resolves(mock[0]);
        sinon.stub(productsModel, 'updateProduct').resolves(changeMock);
      });

      after(function () {
        productsModel.getAllProducts.restore();
        productsModel.updateProduct.restore();
      });

      it('Verifica se retorna um objeto', async function () {
        const result = await productsService.updateProduct(changeMock);
        expect(result).to.be.an('object');
      });

      it('Verifica se o objeto não está vazio', async function () {
        const result = await productsService.updateProduct(changeMock);
        expect(result).to.be.not.empty;
      });

      it('Verifica se os objetos possuem as propriedades: "id" e "name"', async function () {
        const result = await productsService.updateProduct(changeMock);
        expect(result).to.include.all.keys('id', 'name');
      });
    });
  });
});

