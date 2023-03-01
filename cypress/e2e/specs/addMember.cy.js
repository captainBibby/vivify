/// <reference types="Cypress"/>

import { addMember } from '../../page_objects/addMemberPage';

let email = window.localStorage.getItem('email');
let boardId = window.localStorage.getItem('boardId');

describe('add new member to board', () => {
    
    before("login test", () => {
        cy.registerUser();
        cy.loginViaBackend();
        cy.createOrg();
        cy.addBoard();
        cy.visit(`/boards/${boardId}/team`);
        cy.url().should("not.include", "login");
    })
    
    it ("add user to a board", () => {
        
        cy.intercept(
            "POST",
            `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}/users`)
            .as("successfullyAddedUser");

        addMember.addMember(email);

        cy.wait("@successfullyAddedUser").then ((interception) => {
            cy.log(JSON.stringify(interception.response.body));
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.body.user.email).eq(email);
            cy.writeFile('cypress/fixtures/userId.json', {userId : interception.response.body.id});
        })

        cy.url().should("include", "team");
    });
});
