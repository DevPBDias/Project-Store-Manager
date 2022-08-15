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
      expect(response.json.args[0][0]).to.be.empty;
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });
  
  describe('Quando existem produtos no BD', function () {
    const response = {};
    const request = {};
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

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAllProducts').resolves(mock);
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
      expect(response.json.calledWith(mock)).to.be.equal(true);
    });

    it("Verifica se o array possue objetos dentro do array", async function () {
      await productsController.getAllProducts(request, response);
      expect(response.json.args[0][0]).to.not.empty;
      expect(response.json.args[0][0][0]).to.be.an("object");
    });

    it('Verifica se os objetos posuem as propriedades: "id" e "name"', async function () {
      await productsController.getAllProducts(request, response);
      expect(response.json.args[0][0][0]).to.all.keys("id", "name");
    })
  });
});

describe('Recebe todos os produtos por id do BD', function () {

  describe('Quando não existe nenhum produto', function () {
    const response = {};
    const request = {};
  
    before(() => {
      request.params = 1;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductById').resolves();
    });

    after(function () {
      productsService.getProductById.restore();
    });

    it('Verifica se o status é 404', async function () {
      await productsController.getProductById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('Verifica se o array está vazio', async function () {
      const msg = { message: "Product not found" };
      await productsController.getProductById(request, response);
      expect(response.json.args[0][0]).to.all.keys("message");
      expect(response.json.calledWith(msg)).to.be.equal(true);
    });
  });

  describe('Quando existem produtos por id no BD', function () {
    const response = {};
    const request = {};
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

    before(() => {
      request.params = 1;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductById').resolves(mock);
    });

    after(function () {
      productsService.getProductById.restore();
    });

    it('Verifica se o status é 200', async function () {
      await productsController.getProductById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Verifica se o array está com dados', async function () {
      await productsController.getProductById(request, response);
      expect(response.json.calledWith(mock)).to.be.equal(true);
    });

    it('Verifica se o objeto possue os itens: "id" e "name"', async function () {
      await productsController.getProductById(request, response);
      expect(response.json.args[0][0][0]).to.all.keys("id", "name");
    });

    it("Verifica se o produto está correto", async function () {
      await productsController.getProductById(request, response);
      expect(response.json.args[0][0]).to.eql(mock);
    });
  });

  describe('Cadastro de novos produtos do BD', function () {

    describe('Quando existem produtos no BD', function () {
      const response = {};
      const request = {};
      const mock = {
        "id": 4,
        "name": "ProdutoX"
      };

      before(() => {
        request.body = mock;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'addProduct').resolves(mock);
      });

      after(function () {
        productsService.addProduct.restore();
      });

      it('Verifica se o status é 201', async function () {
        await productsController.addProduct(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('Verifica se o objeto está com os dados', async function () {
        await productsController.addProduct(request, response);
        expect(response.json.calledWith(mock)).to.be.equal(true);
      });

      it("Verifica se exite um objeto e não está vazio", async function () {
        await productsController.addProduct(request, response);
        expect(response.json.args[0][0]).to.be.not.empty;
        expect(response.json.args[0][0]).to.be.an("object");
      });

      it('Verifica se o objeto posuem as propriedades: "id" e "name"', async function () {
        await productsController.addProduct(request, response);
        expect(response.json.args[0][0]).to.all.keys("id", "name");
      })
    });
  });

  describe("Verifica se há problema com a rota /products GET", () => {
    const response = {};
    const request = {};

    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, "getAllProducts").rejects(new Error('Server-error'));
    })

    after(function () {
      productsService.getAllProducts.restore();
    })

    it("Verifica se o status é 500", async function () {
      await productsController.getAllProducts(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    })

    it('Verifica se a mensagem de erro  é "Algo deu errado no Controller"', async function () {
      const ERRO = { message: "Algo deu errado no Controller" };
      await productsController.getAllProducts(request, response);
      expect(response.json.args[0][0]).to.eql(ERRO);
    });
  });

  describe("Verifica se há problema com a rota /products/:id", () => {
    const response = {};
    const request = {};

    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, "getProductById").rejects(new Error("Server-error"));
    });

    after(function () {
      productsService.getProductById.restore();
    });

    it("Verifica se o status é 500", async function () {
      await productsController.getProductById(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });

    it('Verifica se a mensagem de erro é "Algo deu errado no Controller"', async function () {
      const ERRO = { message: "Algo deu errado no Controller" };
      await productsController.getProductById(request, response);
      expect(response.json.args[0][0]).to.eql(ERRO);
    });
  });

  describe("Verifica se há problema com a rota /products POST", () => {
    const response = {};
    const request = {};
    const mock = {
      "id": 4,
      "name": "ProdutoX"
    };

    before(() => {
      request.body = mock;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, "addProduct").rejects(new Error("Server-error"));
    });

    after(function () {
      productsService.addProduct.restore(mock);
    });

    it("Verifica se o status é 500", async function () {
      await productsController.addProduct(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });

    it('Verifica se a mensagem de erro é "Algo deu errado no Controller"', async function () {
      const ERRO = { message: "Algo deu errado no Controller" };
      await productsController.addProduct(request, response);
      expect(response.json.args[0][0]).to.eql(ERRO);
    });
  });
});