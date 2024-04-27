/// <reference types= "cypress"/>
import contrato from '../contratos/produtos.contrato'

describe('Testes de API em Produtos', () => {
    
    let token
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => {
            token = tkn
        })
    });

    it('Deve validar contrato de produtos com sucesso', () => {
        cy.request('produtos').then(response =>{
            return contrato.validateAsync(response.body)
        })
        
    });
    it('Listar produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).should((response) =>{
            expect(response.status).equal(200)
            expect(response.body).to.have.property('produtos')
        })
        
    });

    it('Cadastrar produto - POST', () => {
        let produto = 'Produto EBAC ' + Math.floor(Math.random() * 1000000000)
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body:{
                "nome": produto,
                "preco": 5000,
                "descricao": "Iphone 13",
                "quantidade": 12,
            }
        }).should((response) =>{
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        })
        
    });

    it('Deve validar mensagem de produto cadastrado anteriormente', () => {
        cy.cadastrarProduto(token, 'Iphone 13', 5000, 'Iphone 13', 12)
        .should((response) =>{
            expect(response.status).equal(400)
            expect(response.body.message).equal('Já existe produto com esse nome')
        })
    });

    it('Deve editar um produto com sucesso', () => {
        let produto = 'Produto EBAC Editado ' + Math.floor(Math.random() * 1000000000)
        cy.cadastrarProduto(token, produto, 5000, 'Produto EBAC Editado', 12)
            .then(response =>{
                let id = response.body._id
                cy.request({
                    method: 'PUT',
                    url: `produtos/${id}`,
                    headers: {authorization: token},
                    body: {
                        "nome": produto,
                        "preco": 500,
                        "descricao": "Produto Editado",
                        "quantidade": 100
                      }
                }).should(response =>{
                    expect(response.body.message).equal('Registro alterado com sucesso')
                    expect(response.status).equal(200)
                })
            })
        
        
    });

    it('Deve deletar um produto com sucesso', () => {
        cy.cadastrarProduto(token, 'Produto EBAC a ser deletado 1', 100, 'Deletar', 50)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: {authorization: token}
                }).should(resp =>{
                   expect(resp.body.message).to.equal('Registro excluído com sucesso')
                   expect(resp.status).to.equal(200)
                })
            })    
    });
    
});