/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutate: [
    'exemplo/cnh.js'
  ],
  packageManager: 'npm',
  reporters: ['html', 'dashboard', 'clear-text'],
  testRunner: 'command',
  commandRunner: {
    command: 'mocha --config ./exemplo/.mocharc.js'
  },
  mochaOptions: {
    config: './exemplo/.mocharc.js'
  }
}
