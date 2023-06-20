const express = require('express');
const fs = require('fs');
const assert = require('assert');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

let animeData = require('./anime.json');

// Listar todos los animes
app.get('/animes', (req, res) => {
  fs.readFile(__dirname + '/anime.json', 'utf8', (error, dataString) => {
    if (error) {
      return res.status(500).send({ code: 500, message: "No se pudo acceder a la ruta de animes." });
    }
    try {
      const data = JSON.parse(dataString);
      res.status(200).send({ code: 200, data: data, message: "OK" });
    } catch (parseError) {
      res.status(500).send({ code: 500, message: "Error al parsear el archivo de animes." });
    }
  });
});

// Leer los datos de un anime por ID
app.get('/animes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const anime = animeData.find(a => a.id.toString() === id.toString());
  if (anime) {
    res.json(anime);
  } else {
    res.status(404).json({ error: 'Anime no encontrado' });
  }
});

// Leer los datos de un anime por nombre
app.get('/animes/nombre/:nombre', (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const anime = animeData.find(a => a.nombre.toLowerCase() === nombre);

  if (anime) {
   // console.log(anime);
    res.json(anime);
  } else {
    res.status(404).json({ error: 'Anime no encontrado' });
  }
});


// Crear un nuevo anime
app.post('/animes', (req, res) => {
  const anime = req.body;
  if (!anime.nombre || !anime.genero || !anime.año || !anime.autor) {
    return res.status(400).json({ error: 'Formato de anime inválido' });
  }

    anime.id = uuidv4();
    animeData.push(anime);
  guardarDatos();

  res.json({ message: 'Anime creado exitosamente' });
});

// Actualizar los datos de un anime por ID
app.put('/animes/:id', (req, res) => {
  const id = req.params.id;
  const animeIndex = animeData.findIndex(a => a.id == id );

  if (animeIndex !== -1) {
    const updatedAnime = {
      id: animeData[animeIndex].id, 
      nombre: req.body.nombre,
      genero: req.body.genero,
      año: req.body.año,
      autor: req.body.autor
    };

    animeData[animeIndex] = updatedAnime;
    guardarDatos();

    res.json({ message: 'Anime actualizado exitosamente' });
  } else {
    res.status(404).json({ error: 'Anime no encontrado' });
  }
});


// Eliminar un anime por ID
app.delete('/animes/:id', (req, res) => {
  const id = req.params.id;
  const index = animeData.findIndex(a => a.id == id);

  if (index !== -1) {
    animeData.splice(index, 1);
    guardarDatos();
    res.json({ message: 'Anime eliminado exitosamente' });
  } else {
    res.status(404).json({ error: 'Anime no encontrado' });
  }
});

// Función para guardar los datos en el archivo anime.json
function guardarDatos() {
  fs.writeFileSync('./anime.json', JSON.stringify(animeData, null, 2));
}

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = server;
