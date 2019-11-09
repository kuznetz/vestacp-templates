const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express.Router()

let token = null
if (fs.existsSync(config.tokenPath)) {
  token = fs.readFileSync(config.tokenPath,'utf8')
}
console.log('init token',token)

app.use(cors({
  allowedHeaders: ['Content-Type']
}))
//app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.json())
app.use(express.static('frontend'));


app.post('/api/auth', function(req, res) {
  console.log('auth',req.body)
  if ((req.body.login != config.login) || (req.body.password != config.password)) {
    res.send(JSON.stringify({
      error:"Invalid username or password",
      code:"INVALID_USER_PASS"
    }))
    return
  }
  
  token = Math.random().toString(36).substring(2)
  fs.writeFileSync(config.tokenPath,token)
  console.log('new token',token)
  
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.send(JSON.stringify({
    token: token
  }))
});

function checkToken(req, res) {
  console.log('checkToken',token,req.body.token)
  if (!token || (req.body.token != token)) {
    res.send(JSON.stringify({
      error:"Invalid token",
      code:"INVALID_TOKEN"
    }))
    return false
  }
  return true
}


app.post('/api/list', function(req, res) {
  console.log('list',req.body)
  if (!checkToken(req, res)) return;
  
  let files = fs.readdirSync(config.templatesPath).filter(fn => fn.endsWith('.tpl'));
  let result = []
  files.forEach((filename)=>{
    let file = {
      filename: path.parse(filename).name
    }
    let filePath = config.templatesPath+'/'+file.filename
    file.http = fs.readFileSync(filePath + '.tpl','utf8')
    file.https = fs.readFileSync(filePath + '.stpl','utf8')    
    result.push(file)
  })
  
  res.send(JSON.stringify({
    templates: result
  }))
});

app.post('/api/save', function(req, res) {
  console.log('save',req.body)
  if (!checkToken(req, res)) return;
  
  if (req.body.oldFilename) {
    let oldBasePath = config.templatesPath + '/' + req.body.oldFilename
    console.log('delete', oldBasePath)
    if (fs.existsSync(oldBasePath+'.tpl')) {
      fs.unlinkSync(oldBasePath+'.tpl');
    }
    if (fs.existsSync(oldBasePath+'.stpl')) {
      fs.unlinkSync(oldBasePath+'.stpl');
    }    
  }
  
  let basePath = config.templatesPath + '/' + req.body.newFilename
  fs.writeFileSync(basePath+'.tpl',req.body.http)
  fs.writeFileSync(basePath+'.stpl',req.body.https)
  
  res.send(JSON.stringify({ code: 'OK' }))  
});

app.post('/api/delete', function(req, res) {
  console.log('save',req.body)
  if (!checkToken(req, res)) return;
  
  if (req.body.filename) {
    let oldBasePath = config.templatesPath + '/' + req.body.filename
    console.log('delete', oldBasePath)
    if (fs.existsSync(oldBasePath+'.tpl')) {
      fs.unlinkSync(oldBasePath+'.tpl');
    }
    if (fs.existsSync(oldBasePath+'.stpl')) {
      fs.unlinkSync(oldBasePath+'.stpl');
    }
  }

  res.send(JSON.stringify({ code: 'OK' }))
});

module.exports = app