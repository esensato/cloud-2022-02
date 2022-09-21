require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { title: 'Trabalho - OK', message: process.env.EQUIPE })
  })
    
app.listen(port, () => {
    console.log(`Iniciado servidor na porta ${port}`)
})