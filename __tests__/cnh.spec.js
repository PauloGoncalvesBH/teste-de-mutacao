const podeTirarCarteiraDeMotorista = require('../src/cnh')

test('Deve retornar false para pessoa com menos de 18 anos', () => {
  expect(podeTirarCarteiraDeMotorista(17)).toBe(false)
})
