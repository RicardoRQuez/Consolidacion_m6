const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

chai.use(chaiHttp);
const expect = chai.expect;


describe('Anime Server', () => {
    describe('PUT /animes/:id', () => {
        it('Actualiza la información de un anime existente', (done) => {
            const animeId = "5";
            const animeActualizado = {
                nombre: 'Nombre actualizado',
                genero: 'Genero actualizado',
                año: '2022',
                autor: 'Autor Actualizado'
            };

            chai.request(app)
                .put(`/animes/${animeId}`)
                .send(animeActualizado)
                .end((err, res) => {
                    console.log("AAA ", res)
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal({ message: 'Anime actualizado exitosamente' });
                    done();
                });
        });

        it('Devuelve un error si se intenta actualizar un anime inexistente', (done) => {
            const animeId = 100;
            const animeActualizado = {
                nombre: 'Nombre actualizado',
                genero: 'Genero actualizado',
                año: '2022',
                autor: 'Autor Actualizado'
            };

            chai.request(app)
                .put(`/animes/${animeId}`)
                .send(animeActualizado)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.deep.equal({ error: 'Anime no encontrado' });
                    done();
                });
        });
    });
});
