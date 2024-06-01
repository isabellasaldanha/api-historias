const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha'); 

const app = require('../app/index');

chai.use(chaiHttp);

describe("Histórias", () => {
    describe("POST /api/historias", () => {
        it("verificar criação de nova história", (done) => {
            chai.request(app)
                .post('/api/historias')
                .send({ titulo: "João e o pé de feijão", descricao: "João, um menino que morava com sua mãe e que um dia, precisaram vender sua vaca para conseguir se alimentar. Mas no meio do caminho, João encontra um senhor que oferece feijões mágicos em troca.", categoria: "Conto de fadas" })
                .end((err, res) => {
                    chai.expect(res).to.have.status(201); 
                    chai.expect(res.body).to.be.a('object');
                    chai.expect(res.body).to.have.property('id');
                    done();
                });
        });
    });

    describe("GET /api/historias", () => {
        it("deve retornar todas as histórias", (done) => {
            chai.request(app)
                .get('/api/historias')
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe("GET /api/historias/:id", () => {
        it("deve retornar uma história específica", (done) => {
            const id = 10; 
            chai.request(app)
                .get(`/api/historias/${id}`)
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('object');
                    chai.expect(res.body).to.have.property('id').eq(id);
                    done();
                });
        });
    });

    describe("PUT /api/historias/:id", () => {
        it("deve atualizar uma história existente", (done) => {
            const id = 10; 
            chai.request(app)
                .put(`/api/historias/${id}`)
                .send({ titulo: "O pequeno príncipe", descricao: "Um menino muito aventureiro.", categoria: "Aventura", conteudo: "Era uma vez..." })
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('object');
                    chai.expect(res.body).to.have.property('message').eq("História atualizada");
                    done();
                });
        });
    });

    describe("DELETE /api/historias/:id", () => {
        it("deve deletar uma história existente", (done) => {
            const id = 13; 
            chai.request(app)
                .delete(`/api/historias/${id}`)
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('object');
                    chai.expect(res.body).to.have.property('message').eq("História removida");
                    done();
                });
        });
    });

    describe("POST /api/historias/:id/generate", () => {
        it("deve gerar conteúdo para uma história existente", (done) => {
            const id = 10; 
            chai.request(app)
                .post(`/api/historias/${id}/generate`)
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('object');
                    chai.expect(res.body).to.have.property('message').eq("Conteúdo gerado");
                    chai.expect(res.body).to.have.property('conteudo');
                    done();
                });
        }).timeout(10000); 
    });
});
