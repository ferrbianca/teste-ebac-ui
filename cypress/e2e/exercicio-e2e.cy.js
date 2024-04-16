/// <reference types="cypress" />
import produtosPage from "../support/page-objects/produtos.page";

  beforeEach(() => {
    produtosPage.visitarUrl()
});

it.only('Deve adicionar produto ao carrinho e finalizar a compra', () => {
    let qtd = 1
    produtosPage.buscarProduto('Abominable Hoodie')
    produtosPage.addProdutoCarrinho('XS','Red', qtd)
    produtosPage.buscarProduto('Aero Daily Fitness Tee')
    produtosPage.addProdutoCarrinho('M','Brown', qtd)
    produtosPage.buscarProduto('Aether Gym Pant')
    produtosPage.addProdutoCarrinho('32','Blue', qtd)
    produtosPage.buscarProduto('Apollo Running Short')
    produtosPage.addProdutoCarrinho('36','Black', qtd)
    cy.get('.woocommerce-message > .button') .click()
    cy.get('.checkout-button') .click()
    cy.get('.showlogin') .click()
    cy.get('#username') .type('bianca@teste.com.br')
    cy.get('#password') .type('123456')
    cy.get('.woocommerce-button') .click()
    cy.get('.woocommerce-terms-and-conditions-checkbox-text') .click()
    cy.get('#place_order') .click()

    
});



