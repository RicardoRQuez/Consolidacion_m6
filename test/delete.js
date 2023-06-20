const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Anime Server', () => {
  describe('DELETE /animes/:id', () => {
    it('Elimina un anime existente', (done) => {
      const animeId = 2;

      chai.request(app)
        .delete(`/animes/${animeId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({ message: 'Anime eliminado exitosamente' });
          done();
        });
    });

    it('Devuelve un error si se intenta eliminar un anime inexistente', (done) => {
      const animeId = 100;

      chai.request(app)
        .delete(`/animes/${animeId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.deep.equal({ error: 'Anime no encontrado' });
          done();
        });
    });
  });
});
