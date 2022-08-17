const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

describe('1 - Recebe todos os produtos do BD', function () {

  describe('1.1 - Quando não existe nenhum produto', function () {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAllSales').resolves([]);
    });

    after(function () {
      salesService.getAllSales.restore();
    });

    it('Verifica se o status é 200', async function () {
      await salesController.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Verifica se o array está vazio', async function () {
      await salesController.getAllSales(request, response);
      expect(response.json.args[0][0]).to.be.empty;
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('1.2 - Quando existem produtos no BD', function () {
    const response = {};
    const request = {};
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

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAllSales').resolves(mock);
    });

    after(function () {
      salesService.getAllSales.restore();
    });

    it('Verifica se o status é 200', async function () {
      await salesController.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Verifica se o array está com os dados', async function () {
      await salesController.getAllSales(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);
    });

    it("Verifica se o array possue objetos dentro do array", async function () {
      await salesController.getAllSales(request, response);
      expect(response.json.args[0][0]).to.not.empty;
      expect(response.json.args[0][0][0]).to.be.an("object");
    });

    it('Verifica se os objetos posuem as propriedades: "id" e "name"', async function () {
      await salesController.getAllSales(request, response);
      expect(response.json.args[0][0][0]).to.all.keys('saleId', 'date', 'productId', 'quantity');
    })
  });
});

describe('2 - Recebe todos os produtos por id do BD', function () {

  describe('2.1 - Quando não existe nenhum produto', function () {
    const response = {};
    const request = {};

    before(() => {
      request.params = 1;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById').resolves();
    });

    after(function () {
      salesService.getSalesById.restore();
    });

    it('Verifica se o status é 404', async function () {
      await salesController.getSalesById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('Verifica se o array está vazio', async function () {
      const msg = { message: 'Sale not found' };
      await salesController.getSalesById(request, response);
      expect(response.json.args[0][0]).to.all.keys("message");
      expect(response.json.calledWith(msg)).to.be.equal(true);
    });
  });

  describe('2.2 - Quando existem produtos por id no BD', function () {
    const response = {};
    const request = {};
    const mock = [
      {
        "date": "2022-08-17T12:12:54.000Z",
        "productId": 2,
        "quantity": 10
      }
    ];

    before(() => {
      request.params = 1;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById').resolves(mock);
    });

    after(function () {
      salesService.getSalesById.restore();
    });

    it('Verifica se o status é 200', async function () {
      await salesController.getSalesById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Verifica se o array está com dados', async function () {
      await salesController.getSalesById(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);
    });

    it('Verifica se o objeto possue os itens: "id" e "name"', async function () {
      await salesController.getSalesById(request, response);
      expect(response.json.args[0][0][0]).to.all.keys('date', 'productId', 'quantity');
    });

    it("Verifica se o produto está correto", async function () {
      await salesController.getSalesById(request, response);
      expect(response.json.args[0][0]).to.eql(mock);
    });
  });

  describe("3 - Verifica se há problema com a rota /sales GET", () => {
    const response = {};
    const request = {};

    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, "getAllSales").rejects(new Error('Server-error'));
    })

    after(function () {
      salesService.getAllSales.restore();
    })

    it("Verifica se o status é 500", async function () {
      await salesController.getAllSales(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    })

    it('Verifica se a mensagem de erro  é "Algo deu errado no Controller"', async function () {
      const ERRO = { message: "Algo deu errado no Controller" };
      await salesController.getAllSales(request, response);
      expect(response.json.args[0][0]).to.eql(ERRO);
    });
  });

  describe("4 - Verifica se há problema com a rota /sales/:id", () => {
    const response = {};
    const request = {};

    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, "getSalesById").rejects(new Error("Server-error"));
    });

    after(function () {
      salesService.getSalesById.restore();
    });

    it("Verifica se o status é 500", async function () {
      await salesController.getSalesById(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });

    it('Verifica se a mensagem de erro é "Algo deu errado no Controller"', async function () {
      const ERRO = { message: "Algo deu errado no Controller" };
      await salesController.getSalesById(request, response);
      expect(response.json.args[0][0]).to.eql(ERRO);
    });
  });
});