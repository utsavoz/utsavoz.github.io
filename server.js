const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static("express"));
// default URL for website
app.use(express.static(__dirname+'/public'))

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/about', function(req,res){
    res.sendFile(path.join(__dirname+'/public/case_studies/about.html'));
});

app.get('/case-study-1', function(req,res){
    res.sendFile(path.join(__dirname+'/public/case_studies/case-study-1.html'));
});

app.get('/case-study-2', function(req,res){
    res.sendFile(path.join(__dirname+'/public/case_studies/case-study-2.html'));
});

app.get('/case-study-3', function(req,res){
    res.sendFile(path.join(__dirname+'/public/case_studies/case-study-3.html'));
});

const server = http.createServer(app);
const port = 8080;
server.listen(port);
console.debug('Server listening on port ' + port);