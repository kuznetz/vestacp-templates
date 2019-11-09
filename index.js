const config = require('./config');
const express = require('express')
const app = express()
app.use(require('./application'))
app.listen(config.port, () => console.log('Listening on '+config.port))