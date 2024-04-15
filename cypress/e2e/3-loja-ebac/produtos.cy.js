///<reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()
    });

    it('Deve seleciionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Arcadio Gym Short')
       
    });
    
    it('Deve buscar um produto com sucesso', () => {
        produtosPage.buscarProduto('Aether Gym Pant')
        cy.get('.product_title').should('contain', 'Aether Gym Pant')
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('aether-gym-pant')
        cy.get('.product_title').should('contain', 'Aether Gym Pant')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 7
        produtosPage.buscarProduto('Ingrid Running Jacket')
        produtosPage.addProdutoCarrinho('M','Red', qtd)
        
    });

    it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados =>{

        produtosPage.buscarProduto(dados[1].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[1].tamanho, dados[1].cor, dados[1].quantidade)
        })
        
    });
});