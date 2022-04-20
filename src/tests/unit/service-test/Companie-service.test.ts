import { expect } from 'chai';
import sinon from 'sinon';
import { createCompanie, createdCompanie, createdCompanieService, allCompanies, findOneCompanie, editedObj } from '../../mocks/Companie-Mocks'
import { Companie, CompanieAuthorization } from '../../../interfaces/Companie-Interface';
import { Document } from 'mongoose';
import CompanieService from '../../../services/Companie/Companie-Service';

type returnType = Companie & Document<any, any, any> & { _id: any; }

describe('testa camada Model CompanieService', () => {
  let companieService = new CompanieService();

  before(() => {
    sinon
      .stub(companieService.model, 'create')
      .resolves(createdCompanie as any);
    sinon
      .stub(companieService.model, 'readOne')
      .resolves(false as any);
  });

  after(() => {
    (companieService.model.create as sinon.SinonStub).restore();
    (companieService.model.readOne as sinon.SinonStub).restore();
  })

  it('teste se o método create do CompanieService está implementado da maneira correta', async () => {
    const returnCreateCompanie = await companieService.create(createCompanie as Companie);

    const { name, CNPJ, password, Authorization, users } = returnCreateCompanie as CompanieAuthorization
    expect(returnCreateCompanie).to.be.an('object');
    expect(name).to.be.equal(createdCompanieService.name);
    expect(CNPJ).to.be.equal(createdCompanieService.CNPJ);
    expect(password).to.be.equal(createdCompanieService.password);
    expect(Authorization).to.be.an('string');
    expect(users).to.have.lengthOf(0);
  });

});


describe('testa camada Model CompanieService', () => {
  let companieService = new CompanieService();

  before(() => {
    sinon
      .stub(companieService.model, 'read')
      .resolves(allCompanies as any);
    sinon
      .stub(companieService.model, 'readOne')
      .resolves(findOneCompanie as any);
  });

  after(() => {
    (companieService.model.read as sinon.SinonStub).restore();
    (companieService.model.readOne as sinon.SinonStub).restore();
  })

  it('testa se o método read do CompanieService está implementado da maneira correta', async () => {
    const returnReadCompanie = await companieService.read();

    expect(returnReadCompanie).to.have.lengthOf(4);
    expect(returnReadCompanie[0].name).to.be.equal('Ziggy Stardust')
    expect(returnReadCompanie[1].name).to.be.equal('Freios e Contrapesos')
    expect(returnReadCompanie[2].name).to.be.equal('Vaquinha Feliz')
    expect(returnReadCompanie[3].name).to.be.equal('Dayse Embarcações')
    expect(returnReadCompanie[0].password).to.be.equal('08011947')
    expect(returnReadCompanie[1].password).to.be.equal('14071789')
    expect(returnReadCompanie[2].password).to.be.equal('12345678')
    expect(returnReadCompanie[3].password).to.be.equal('17hgxgg8')
  })

  it('testa se o método readOne do CompanieService está implementado da maneira correta', async () => {
    const returnFindOneCompanie = await companieService.readOne('4edd40c86762e0fb12000003');
    const { CNPJ, name, password } = returnFindOneCompanie as returnType

    expect(returnFindOneCompanie).to.be.an('object');
    expect(name).to.be.equal('Ziggy Stadust');
    expect(CNPJ).to.be.equal('12345678912345');
    expect(password).to.be.equal('08011947');
  })

});

describe('testa camada Model CompanieService', () => {
  let companieService = new CompanieService();

  before(() => {
    sinon
      .stub(companieService.model, 'update')
      .resolves(editedObj);
  });

  after(() => {
    (companieService.model.update as sinon.SinonStub).restore();
  })

  it('testa se o método update do CompanieService está implementado da maneira correta', async () => {
    const returnUpdateCompanie = await companieService.update('12345678912345', editedObj as Companie);
    const { CNPJ, name, password } = returnUpdateCompanie as returnType

    expect(returnUpdateCompanie).to.be.an('object');
    expect(name).to.be.equal('Fabrica suco Feliz');
    expect(CNPJ).to.be.equal('12345678912345');
    expect(password).to.be.equal('12345678');
  })
});

describe('testa camada Model CompanieService', () => {
  let companieService = new CompanieService();

  before(() => {
    sinon
    .stub(companieService.model, 'delete')
    .resolves(editedObj as any);

  });

  after(() => {
    (companieService.model.delete as sinon.SinonStub).restore();
  })

  it('testa se o método delete do CompanieService está implementado da maneira correta', async () => {
    const mockCompan = await companieService.delete('12345678912345');
    const { CNPJ, name, password } = mockCompan as returnType

    expect(mockCompan).to.be.an('object');
    expect(name).to.be.equal('Fabrica suco Feliz');
    expect(CNPJ).to.be.equal('12345678912345');
    expect(password).to.be.equal('12345678');
  })
});
