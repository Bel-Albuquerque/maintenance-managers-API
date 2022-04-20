import { expect } from 'chai';
import sinon from 'sinon';
import CompanieModel from '../../../models/Companie/Companie-Model';
import { createCompanie, createdCompanie, allCompanies, findOneCompanie, editedObj } from '../../mocks/Companie-Mocks'
import { Companie } from '../../../interfaces/Companie-Interface';
import { Document } from 'mongoose';

type returnType = Companie & Document<any, any, any> & { _id: any; }

describe('testa camada Model CompanieModel', () => {
  let companieModel = new CompanieModel();

  before(() => {
    sinon
      .stub(companieModel.model, 'create')
      .resolves(createdCompanie as any);
    sinon
      .stub(companieModel.model, 'find')
      .resolves(allCompanies as any);
    sinon
      .stub(companieModel.model, 'findOne')
      .resolves(findOneCompanie as any);
  });

  after(() => {
    (companieModel.model.create as sinon.SinonStub).restore();
    (companieModel.model.find as sinon.SinonStub).restore();
    (companieModel.model.findOne as sinon.SinonStub).restore();
  })

  it('teste se o método create do CompanieModel está implementado da maneira correta', async () => {
    const returnCreateCompanie = await companieModel.create(createCompanie as Companie);

    expect(returnCreateCompanie).to.be.an('object');
    expect(returnCreateCompanie.name).to.be.equal(createdCompanie.name);
    expect(returnCreateCompanie.CNPJ).to.be.equal(createdCompanie.CNPJ);
    expect(returnCreateCompanie.password).to.be.equal(createdCompanie.password);
    expect(returnCreateCompanie.users).to.have.lengthOf(0);
  });

  it('testa se o método read do CompanieModel está implementado da maneira correta', async () => {
    const returnReadCompanie = await companieModel.read();

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

  it('testa se o método findOne do CompanieModel está implementado da maneira correta', async () => {
    const returnReadeOneCompanie = await companieModel.readOne('4edd40c86762e0fb12000003');
    const { CNPJ, name, password } = returnReadeOneCompanie as returnType

    expect(returnReadeOneCompanie).to.be.an('object');
    expect(name).to.be.equal('Ziggy Stadust');
    expect(CNPJ).to.be.equal('12345678912345');
    expect(password).to.be.equal('08011947');
  })

});

describe('testa camada Model CompanieModel', () => {
  let companieModel = new CompanieModel();

  before(() => {
    sinon
      .stub(companieModel.model, 'findOne')
      .resolves(editedObj as any);
    sinon
      .stub(companieModel.model, 'updateOne');
  });

  after(() => {
    (companieModel.model.findOne as sinon.SinonStub).restore();
    (companieModel.model.updateOne as sinon.SinonStub).restore();
  })

  it('testa se o método update do CompanieModel está implementado da maneira correta', async () => {
    const returnUpdateCompanie = await companieModel.update('4edd40c86762e0fb12000003', editedObj as Companie);
    const { CNPJ, name, password } = returnUpdateCompanie as returnType

    expect(returnUpdateCompanie).to.be.an('object');
    expect(name).to.be.equal('Fabrica suco Feliz');
    expect(CNPJ).to.be.equal('12345678912345');
    expect(password).to.be.equal('12345678');
  })
});

describe('testa camada Model CompanieModel', () => {
  let companieModel = new CompanieModel();

  before(() => {
    sinon
      .stub(companieModel.model, 'findOne')
      .resolves(editedObj as any);
    sinon
      .stub(companieModel.model, 'findOneAndDelete');

  });

  after(() => {
    (companieModel.model.findOne as sinon.SinonStub).restore();
    (companieModel.model.findOneAndDelete as sinon.SinonStub).restore();
  })

  it('testa se o método delete do CompanieModel está implementado da maneira correta', async () => {
    const mockCompan = await companieModel.delete('4edd40c86762e0fb12000003');
    const { CNPJ, name, password } = mockCompan as returnType

    expect(mockCompan).to.be.an('object');
    expect(name).to.be.equal('Fabrica suco Feliz');
    expect(CNPJ).to.be.equal('12345678912345');
    expect(password).to.be.equal('12345678');
  })
});
