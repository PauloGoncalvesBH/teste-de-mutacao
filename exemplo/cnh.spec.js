const podeTirarCarteiraDeMotorista = require('./cnh')

const { expect } = require('chai')

describe('CNH', () => {
  it('Deve retornar false para pessoa com menos de 18 anos', () => {
    expect(podeTirarCarteiraDeMotorista(17)).to.be.false
  })
})
