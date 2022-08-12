const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require('../../../models/connectionProducts');
const productsModel = require('../../../models/productsModel');


describe('Recebe todos os produtos do BD', () => {

  describe('Quando não existe nenhum produto', () => {
    before(function () {
      const resultadoExecute = [[], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });

    after(function () {
      connection.execute.restore();
    });

    it('Verifica se retorna um array', async function () {
      const result = await productsModel.getAllProducts();
      expect(result).to.be.an('array');
    });

        it('Verifica se o array está vazio', async function () {
      const result = await productsModel.getAllProducts();
      expect(result).to.be.empty;
    });
  });

  describe('Quando existem produtos no BD', () => {
    const mock = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
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
      const resultado = await productsModel.getAllProducts();
      expect(resultado).to.be.an('array');
    });

    it('Verifica se o array não está vazio', async function () {
      const result = await productsModel.getAllProducts();
      expect(result).to.be.not.empty;
    });

    it('Verifica se o array possue objetos como itens do array', async function () {
      const result = await productsModel.getAllProducts();
      expect(result[0]).to.be.an('object');
    });

    it('Verifica se os objetos possuem as propriedades: "id" e "name"', async function () {
      const result = await productsModel.getAllProducts();
      const item = result[0];
      expect(item).to.include.all.keys('id', 'name');
    });
  });
});

describe('Recebe o produto por id pelo BD', () => {

  describe('Quando não existe nenhum produto', () => {

    before(function () {
      const resultadoExecute = [[], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });

    after(function () {
      connection.execute.restore();
    });

    it('Verifica se retorna um array', async function () {
      const result = await productsModel.getProductById(1);
      expect(result).to.be.null;
    });
  });

  describe('Quando existem produtos no BD', () => {
    const mock = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
    ];

    before(function () {
      const resultadoExecute = [mock, []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });

    it('Verifica se retorna um objeto', async function () {
      const resultado = await productsModel.getProductById(1);
      expect(resultado).to.be.an('object');
    });

    it('Verifica se o array não está vazio', async function () {
      const result = await productsModel.getProductById(1);
      expect(result).to.be.not.empty;
    });

    it('Verifica se o array possue objetos como itens do array', async function () {
      const result = await productsModel.getProductById(1);
      expect(result).to.be.an('object');
    });

    it('Verifica se os objetos possuem as propriedades: "id" e "name"', async function () {
      const result = await productsModel.getProductById(1);
      expect(result).to.include.all.keys('id', 'name');
    });
  });
});