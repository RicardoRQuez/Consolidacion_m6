const assert = require('assert');
const request = require('supertest');
const app = require('./index.js'); // Asegúrate de que el nombre del archivo principal sea correcto

describe('Anime Server', () => {
  describe('GET /animes', () => {
    it('should return all animes', (done) => {
      request(app)
        .get('/animes')
        .expect(200)
        .end((err, res) => {
          assert.ok(res.body);
          // Agrega aquí las aserciones específicas que esperas para la respuesta
          done();
        });
    });
  });

  describe('GET /animes/:id', () => {
    it('should return the data of a specific anime', (done) => {
      const animeId = 1; // ID del anime existente
      request(app)
        .get(`/animes/${animeId}`)
        .expect(200)
        .end((err, res) => {
          assert.ok(res.body);
          // Agrega aquí las aserciones específicas que esperas para la respuesta
          done();
        });
    });

    it('should return an error for a non-existent anime', (done) => {
      const animeId = 999; // ID de un anime que no existe
      request(app)
        .get(`/animes/${animeId}`)
        .expect(404)
        .end((err, res) => {
          assert.ok(res.body);
          // Agrega aquí las aserciones específicas que esperas para la respuesta
          done();
        });
    });
  });

  // Otros tests para las demás rutas y funcionalidades del servidor

});
