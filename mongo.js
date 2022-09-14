const express = require('express')
const app = express()
const port = 3000

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';

function criarMensagem(mensagem, res) {
    MongoClient.connect(url, (err, client) => {

        if (err) {
            console.log('Erro!')
        } else {
            console.log('OK!')
            client.db('MensagensDB').collection('Mensagem').insertOne({
                texto: mensagem
            }, (err, result) => {
                console.log(result);
                client.close();
                res.send(result);
            });
        }
    });
}

function listarMensagens(res) {
    MongoClient.connect(url, (err, client) => {

        if (err) {
            console.log('Erro!')
        } else {
            console.log('OK!')
            client.db('MensagensDB').collection('Mensagem').findOne((err, result) => {
                res.send(result);

            });
            
        }
    });
}

app.get('/', (req, res) => {
    console.log('Requisicao recebida')
    listarMensagens(res);
})

app.get('/novo/:msg', (req, res) => {
    console.log('Requisicao recebida')
    criarMensagem(req.params.msg, res);
})

app.listen(port, () => {
    console.log(`Iniciado servidor na porta ${port}`)
})
    
