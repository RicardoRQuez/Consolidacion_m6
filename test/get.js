const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Anime Server', () => {
  describe('GET /animes', () => {
    it('Devuelve todos los animes', (done) => {
      chai.request(app)
        .get('/animes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');

          done();
        });
    });
  });
});


describe('GET /animes/:id', () => {
  it('Devuelve la informacion de un anime en especifico', (done) => {
    const animeId = 1;
    chai.request(app)
      .get(`/animes/${animeId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');

        done();
      });
  });

  it('Devuelve un error por anime inexistente', (done) => {
    const animeId = 999;
    chai.request(app)
      .get(`/animes/${animeId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');

        done();
      });
  });
});

describe('GET /animes/nombre/:nombre', () => {
  it('Devuelve los datos de un anime especifico', (done) => {
    const animeNombre = "Akira";
    chai.request(app)
      .get(`/animes/nombre/${animeNombre}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');

        done();
      });
  });

  it('Devuelve un error para un anime inexistente', (done) => {
    const animeNombre = "anime";
    chai.request(app)
      .get(`/animes/nombre/${animeNombre}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');

        done();
      });
  });
});



