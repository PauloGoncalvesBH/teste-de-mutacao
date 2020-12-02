/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutate: [
    'src/cnh.js'
  ],
  reporters: ['html', 'clear-text'],
  testRunner: 'jest',
  jest: {
      enableFindRelatedTests: false,
  }
}
