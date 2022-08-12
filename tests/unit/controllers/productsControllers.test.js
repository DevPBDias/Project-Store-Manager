const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('Recebe todos os produtos do BD', function () {

  describe('Quando não existe nenhum produto', function () {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAllProducts').resolves([]);
    });

    after(function () {
      productsService.getAllProducts.restore();
    });

    it('Verifica se o status é 200', async function () {
      await productsController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Verifica se o array está vazio', async function () {
      await productsController.getAllProducts(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });
  
  describe('Quando existem produtos no BD', function () {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAllProducts').resolves([{ id: 1, name: 'Martelo de Thor' }]);
    });

    after(function () {
      productsService.getAllProducts.restore();
    });

    it('Verifica se o status é 200', async function () {
      await productsController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Verifica se o array está com os dados', async function () {
      await productsController.getAllProducts(request, response);
      expect(response.json.calledWith([{ id: 1, name: 'Martelo de Thor' }])).to.be.equal(true);
    });
  });
});