import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { createCompanie, createdCompanie, wrongObjectToCreation, allCompanies, findOneCompanie, editedObj } from '../../mocks/Companie-Mocks'
import { Companie, CompanieAuthorization } from '../../../interfaces/Companie-Interface';
import { Document } from 'mongoose';
import { RequestWithBody } from '../../../interfaces/Controller-Interfaces';
import StatusCode from '../../../interfaces/Status-Code';
import CompanieController from '../../../controllers/Companie/Companie-Controller';

chai.use(chaiHttp);

const { expect } = chai;
const {
OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCode;



describe('testa camada Controller CompanieController', () => {
  const companieController = new CompanieController()
  const request = {} as RequestWithBody<Companie>;
  const response = {} as any;
  
  before(async () => {
    request.body = createCompanie;
  
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(companieController.service, 'create')
      .resolves(createdCompanie)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se a rota está correta /companies', () => {    
    expect(companieController.route).to.be.equal('/companies')
  })

  it('teste se o método create do CompanieController está implementado da maneira correta', async () => {
   await companieController.create(request, response);

    expect((response.status).calledWith(CREATED)).to.be.equal(true);
    expect((response.json).calledWith(createdCompanie)).to.be.equal(true);
  });

});


describe('testa camada Controller CompanieController', () => {

  const companieController = new CompanieController()
  const request = {} as RequestWithBody<Companie>;
  const response = {} as any;

  before(async () => {

    request.body = wrongObjectToCreation;

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
    sinon.stub(companieController.service, 'create').resolves()
  });

  it('testa se o método create do CompanieController retorna erro quando recebe um objeto que não atende às regras de negócio', async () => {
   await companieController.create(request, response);

    expect(response.status.calledWith(BAD_REQUEST)).to.be.equal(true);
  });

});

describe('testa camada Controller CompanieController', () => {
  const companieController = new CompanieController()
  const request = {} as RequestWithBody<Companie>;
  const response = {} as any;
  
  before(async () => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(companieController.service, 'read')
      .resolves(allCompanies)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método read do CompanieController está implementado da maneira correta', async () => {
   await companieController.read(request, response);

    expect(response.status.calledWith(OK)).to.be.equal(true);
    expect((response.json).calledWith(allCompanies)).to.be.equal(true);
  });

});

describe('testa camada Controller CompanieController', () => {
  const companieController = new CompanieController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.params = "4edd40c86762e0fb12000003"
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(companieController.service, 'readOne')
      .resolves(findOneCompanie)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método readOne do CompanieController está implementado da maneira correta', async () => {
   await companieController.readOne(request, response);

    expect(response.status.calledWith(OK)).to.be.equal(true);
    expect((response.json).calledWith(findOneCompanie)).to.be.equal(true);
  });

});

// describe('testa camada Controller CompanieController', () => {
//   const companieController = new CompanieController()
//   const request = {} as any;
//   const response = {} as any;
  
//   before(async () => {
//     request.params = ["12000003"]
//     response.status = sinon.stub().returns(response);
//     response.json = sinon.stub();
//   });

//   after(()=>{
//     sinon.restore();
//   })

//   it('testa se o método readOne do CompanieController retorna erro quando não recebe o id valido no params', async () => {
//    await companieController.readOne(request, response);

//     expect(response.status.calledWith(BAD_REQUEST)).to.be.equal(true);
//     expect((response.json).getCall(0).args[0]).to.have.property('error');
//   });
// });

describe('testa camada Controller CompanieController', () => {
  const companieController = new CompanieController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.body = editedObj;
    request.params = "4edd40c86762e0fb12000003"
    
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(companieController.service, 'update')
      .resolves(editedObj)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método update do CompanieController está implementado da maneira correta', async () => {
   await companieController.update(request, response);

   expect((response.status).calledWith(OK)).to.be.equal(true);
   expect((response.json).calledWith(editedObj)).to.be.equal(true);
  });
});


// describe('testa camada Controller CompanieController', () => {
//   const companieController = new CompanieController()
//   const request = {} as any;
//   const response = {} as any;
  
//   before(async () => {
//     request.body = wrongObjectToCreation;
//     request.params = "4edd40c86762e0fb12000003"
    
//     response.status = sinon.stub().returns(response);
//     response.json = sinon.stub();
//   });

//   after(()=>{
//     sinon.restore();
//   })

//   it('testa se o método update do CompanieController retorna erro, caso o body seja invalido', async () => {
//    await companieController.update(request, response);

//    expect((response.status).calledWith(BAD_REQUEST)).to.be.equal(true);
//    expect((response.json).getCall(0).args[0]).to.have.property('error');
//   });
// });


describe('testa camada Controller CompanieController', () => {
  const companieController = new CompanieController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.body = {};
    request.params = "4edd40c86762e0fb12000003"

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
    .stub(companieController.service, 'update')
    .resolves(null)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método update do CompanieController retorna erro, caso o body seja invalido', async () => {
   await companieController.update(request, response);

   expect((response.status).calledWith(NOT_FOUND)).to.be.equal(true);
   expect((response.json).getCall(0).args[0]).to.have.property('error');
  });
});

describe('testa camada Controller CompanieController', () => {
  const companieController = new CompanieController()
  const request = {} as any;
  const response = {} as any;
  
  before(async () => {
    request.params = "4edd40c86762e0fb12000003"
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon
      .stub(companieController.service, 'delete')
      .resolves(findOneCompanie)
  });

  after(()=>{
    sinon.restore();
  })

  it('testa se o método delete do CompanieController está implementado da maneira correta', async () => {
   await companieController.delete(request, response);

    expect(response.status.calledWith(NO_CONTENT)).to.be.equal(true);
    expect((response.json).calledWith(findOneCompanie)).to.be.equal(true);
  });
});

// describe('testa camada Controller CompanieController', () => {
//   const companieController = new CompanieController()
//   const request = {} as any;
//   const response = {} as any;
  
//   before(async () => {
//     request.params = [12000003]
//     response.status = sinon.stub().returns(response);
//     response.json = sinon.stub();
//   });

//   after(()=>{
//     sinon.restore();
//   })

//   it('testa se o método delete do CompanieController retorna erro caso o id seja passado de maneira incorreta', async () => {
//    await companieController.delete(request, response);

//    expect((response.status).calledWith(INTERNAL_SERVER_ERROR)).to.be.equal(true);
//    expect((response.json).getCall(0).args[0]).to.have.property('error');
//   });

// });

