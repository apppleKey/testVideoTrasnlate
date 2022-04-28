var express=require('express');
var app =express()

const ip=require('ip')
const IP=ip.address()

app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization'); 
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); 
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); 
    // res.setHeader("Content-Type", "application/json;charset=utf-8");
    next();
})
const path = require('path');
const fs = require('fs');
const options = {
  key: fs.readFileSync(path.join(__dirname, './private.pem')),
  cert: fs.readFileSync(path.join(__dirname, './file.crt'))
}

var https =require('https')
// 创建服务
app.use(express.static('public'))
var httpsServer = https.createServer(options, app);
var server =httpsServer.listen(3001,function(){
    var port=server.address().port;
    console.log(`http://${IP}:${port}`)
})