const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Anime Server', () => {
  describe('POST /animes', () => {
    it('Creacion nuevo anime', (done) => {
      const anime = {
        nombre: 'One Piece',
        genero: 'Shonen',
        año: 1999,
        autor: 'Eiichiro Oda',
      };

      chai.request(app)
        .post('/animes')
        .send(anime)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equal('Anime creado exitosamente');
          done();
        });
    });

    it('Devuelve un error por formato invalido al crear anime', (done) => {
      const invalidAnime = {
        genero: 'Shonen',
        año: 1999,
        autor: 'Eiichiro Oda',
      };

      chai.request(app)
        .post('/animes')
        .send(invalidAnime)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});
