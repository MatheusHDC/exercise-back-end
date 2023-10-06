const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const fs = require('fs');
const app = require('../../app');

chai.use(chaiHttp)

const { expect } = chai;

const mockFile = JSON.stringify({ 
    brands: [
      {
        id: 1,
        name: 'Lindt & Sprungli',
      },
      {
        id: 2,
        name: 'Ferrero',
      },
      {
        id: 3,
        name: 'Ghirardelli',
      },
    ],
    chocolates: [
      {
        id: 1,
        name: 'Mint Intense',
        brandId: 1,
      },
      {
        id: 2,
        name: 'White Coconut',
        brandId: 1,
      },
      {
        id: 3,
        name: 'Mon Chéri',
        brandId: 2,
      },
      {
        id: 4,
        name: 'Mounds',
        brandId: 3,
      },
    ],
  });

describe('testa chocolates', () => {
    it('testa o get /chocolate/total', async () => {
        sinon.stub(fs.promises, 'readFile'). resolves(mockFile);
        const response = await chai
            .request(app)
            .get('/chocolates/total');

        expect(response.status).to.be.equal(200);
        expect(response.body.totalChocolates).to.deep.equal(4)
    });
});

describe('Usando o método GET em /chocolates/search', function () {
    it('Retorna os chocolates que contém "Mo" no nome', async function () {
    //  sinon.stub(fs.promises, 'readFile'). resolves(mockFile);

      const response = await chai
        .request(app)
        .get('/chocolates/search?name=Mo');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal([
        {
          id: 3,
          name: 'Mon Chéri',
          brandId: 2,
        },
        {
          id: 4,
          name: 'Mounds',
          brandId: 3,
        },
      ]);
    });

    it('Retorna um array vazio ao não encontrar nenhum chocolate', async function () {
    //   sinon.stub(fs.promises, 'readFile'). resolves(mockFile);
        
      const response = await chai
        .request(app)
        .get('/chocolates/search?name=ZZZ');

      expect(response.status).to.be.equal(404);
      expect(response.body).to.deep.equal([]);
    });
  });
