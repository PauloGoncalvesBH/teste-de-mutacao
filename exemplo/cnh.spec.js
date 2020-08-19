const podeTirarCarteiraDeMotorista = require('./cnh')

const { expect } = require('chai')

describe('CNH', () => {
  it('Menor de 18 anos', () => {
    expect(podeTirarCarteiraDeMotorista(17)).to.be.false
  })
})
