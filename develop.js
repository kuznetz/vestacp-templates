const config = require('./config');
const express = require('express')
const app = express()
const reload = require('express-reload')

var pathApp = __dirname + '/application'
app.use(reload(pathApp))

app.listen(config.port, () => console.log('Listening on '+config.port))