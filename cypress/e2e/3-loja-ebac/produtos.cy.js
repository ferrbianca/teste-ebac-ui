///<reference types="cypress"/>

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve seleciionar um produto da lista', () => {
        cy.get('.product-block')
            .first()
            .click()
    });
    
});