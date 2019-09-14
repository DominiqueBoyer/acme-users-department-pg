const express = require('express');
const db = require('./db');
const app = express();
const path = require('path');

app.get('/api/users', async(req, res, next)=>{
  try{
    res.send(await db.getAllUsers());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/departments', async(req, res, next)=>{
  try{
    res.send(await db.getAllDepartments());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', async(req, res, next)=> {
  try{
    res.sendFile(await path.join(__dirname, 'index.html'))
  }
  catch(ex){
    next(ex);
  }
});

app.listen(3000);

