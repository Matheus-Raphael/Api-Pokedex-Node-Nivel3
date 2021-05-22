const express = require('express');
const app = express();

const pokedex_v1 = require('./data/pokedex_v1.json');
const pokedex_v2 = require('./data/pokedex_v2.json');
const summary   = require('./data/summary.json');

app.use(express.json());

//List Summary Pokedex
app.get('/pokedex/', (req, res) => {
    res.send(summary);
});

//List All Pokemon in Pokedex by version
app.get('/pokedex/:version', (req, res) => {

    if (req.params.version == "v1") {
        res.send(pokedex_v1);
        return;
    }

    if (req.params.version == "v2") {
        res.send(pokedex_v2);
        return;
    }

    res.status(404).send({ error: 'version not found' });
    return;
});

//List Pokemon in Pokedex by version and id
app.get('/pokedex/:version/pokemon/id/:id', (req, res) => {
    var base_pokedex = [];

    if (req.params.version == "v1") {
        base_pokedex = pokedex_v1;
    }

    if (req.params.version == "v2") {
        base_pokedex = pokedex_v2;
    }

    if (base_pokedex.length == 0) {
        res.status(404).send({ error: 'version not found' });
        return;
    }

    let pokemon = base_pokedex.find(pokemon => pokemon.id == req.params.id);
   
    if (!pokemon) {
        res.status(404).send({ error: 'entity not found' });
        return;
    }

    res.send(pokemon);
});

//List Pokemon in Pokedex by version and name english
app.get('/pokedex/:version/pokemon/name/:name', (req, res) => {
    var base_pokedex = [];

    if (req.params.version == "v1") {
        base_pokedex = pokedex_v1;
    }

    if (req.params.version == "v2") {
        base_pokedex = pokedex_v2;
    }

    if (base_pokedex.length == 0) {
        res.status(404).send({ error: 'version not found' });
        return;
    }

    let pokemon = base_pokedex.find(pokemon => pokemon.name.english == req.params.name);

    if (!pokemon) {
        res.status(404).send({ error: 'entity not found' });
        return;
    }

    res.send(pokemon);
});

//List Pokemon in Pokedex by version and type
app.get('/pokedex/:version/pokemon/type/:type', (req, res) => {  
    var base_pokedex = [];

    if (req.params.version == "v1") {
        base_pokedex = pokedex_v1;
    }

    if (req.params.version == "v2") {
        base_pokedex = pokedex_v2;
    }

    if (base_pokedex.length == 0) {
        res.status(404).send({ error: 'version not found' });
        return;
    }
    
    let pokemon = base_pokedex.filter((pokemon) => { 
        return pokemon.type.indexOf(req.params.type) >= 0
    });

    if (pokemon.length == 0) {
        res.status(404).send({ error: 'entity not found' });
        return;
    }

    res.send(pokemon);
});


app.listen(3000, () => console.log('Listening on port 3000'));