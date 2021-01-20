const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const app = express();
const redisClient = redis.createClient();

// npm init <- Legt ein neues Node.js-Projekt an (erstellt package.json)
// npm install express <- Installiert Express
// npm start <- Startet den Befehl "start" aus package.json
// npm install -D nodemon <- Installiert Nodemon als Dev-Dependency
// npm install redis <- Installiert Redis
// npm install body-parser <- Installiert Body-Parser

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hallo Welt 2');
});

app.get('/chats/:id', (req, res) => {
    redisClient.lrange(`chat.${req.params.id}`, 0, -1, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        } else {
            res.send(data);
        }
    });
});

app.post('/chats/:id', (req, res) => {
    redisClient.rpush(`chat.${req.params.id}`, req.body.message, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        } else {
            res.send('OK');
        }
    });
});

app.listen(3000); // localhost:3000
