/// <reference types="cypress" />
import contrato from "../contratos/usuarios.contrato"

describe("Testes da Funcionalidade Usuários", () => {
  it("Deve validar contrato de usuários", () => {
    cy.request("usuarios").then((response) => {
      return contrato.validateAsync(response.body);
    });
  });

  it("Deve listar usuários cadastrados", () => {
    cy.request("usuarios").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("usuarios");
    });
  });

  it("Deve cadastrar um usuário com sucesso", () => {
    let random = Math.floor(Math.random() * 100000000);
    let usuario = "usuario" + random;
    let email = "teste" + random + "@ebac.com.br";
    cy.cadastrarUsuario(usuario, email, "teste", "true").then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Cadastro realizado com sucesso");
    });
  });

  it("Deve validar um usuário com email inválido", () => {
    let random = Math.floor(Math.random() * 100000000);
    let usuario = "usuario" + random;
    let email = "teste@ebac.com.br";
    cy.cadastrarUsuario(usuario, email, "teste", "true").then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal("Este email já está sendo usado");
    });
  });

  it("Deve editar um usuário previamente cadastrado", () => {
    let id;
    let random = Math.floor(Math.random() * 100000000);
    let usuario = "usuario" + random;
    let email = "teste" + random + "@ebac.com.br";
    cy.cadastrarUsuario(usuario, email, "teste", "true").then((response) => {
      expect(response.status).to.equal(201);
      id = response.body._id;

      cy.request({
        method: "PUT",
        url: `usuarios/${id}`,
        body: {
          nome: usuario,
          email: email,
          password: "senha editada",
          administrador: "false",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.equal("Registro alterado com sucesso");
      });
    });
  });

  it("Deve deletar um usuário previamente cadastrado", () => {
     let id;
     let random = Math.floor(Math.random() * 100000000);
     let usuario = "usuario" + random;
     let email = "teste" + random + "@ebac.com.br";
     cy.cadastrarUsuario(usuario, email, "teste", "true").then((response) => {
       expect(response.status).to.equal(201);
       id = response.body._id;
 
       cy.request({
         method: "DELETE",
         url: `usuarios/${id}`,
         failOnStatusCode: false,
       }).then((response) => {
         expect(response.status).to.eq(200);
         expect(response.body.message).to.equal("Registro excluído com sucesso");
       });
     });
  });
});