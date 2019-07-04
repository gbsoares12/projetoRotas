// Get dependencies
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist/projetoRota'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/projetoRota/index.html');
});

app.listen(process.env.PORT || '4200');