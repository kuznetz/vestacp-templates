// vue.config.js
const path = require('path')

console.log('path',path.join(__dirname, '../frontend'),)
module.exports = {
  outputDir: path.join(__dirname, '../frontend'),
}