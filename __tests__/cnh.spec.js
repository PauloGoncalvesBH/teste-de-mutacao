const podeTirarCarteiraDeMotorista = require('../src/cnh')

test('Deve retornar false para pessoa com menos de 18 anos', () => {
  expect(podeTirarCarteiraDeMotorista(17)).toBe(false)
})
test('Deve retornar true para pessoa com mais de 18 anos', () => {
  expect(podeTirarCarteiraDeMotorista(19)).toBe(true)
})

test('Deve retornar true para pessoa com mais de 18 anos', () => {
  expect(podeTirarCarteiraDeMotorista(18)).toBe(true)
})

