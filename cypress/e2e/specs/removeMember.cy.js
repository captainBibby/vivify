/// <reference types="Cypress"/>

import { removeMember } from '../../page_objects/removeMemberPage';


describe('remove member from a board', () => {
    
    before("login test", () => {
        cy.loginViaBackend();
        cy.readFile('cypress/fixtures/ids.json').then((ids) =>{
            cy.wrap(ids).as('boardId');
            boardId = ids.boardId;
        })
        cy.readFile('cypress/fixtures/ids1.json').then((ids1) =>{
            cy.wrap(ids1).as('orgId');
            orgId = ids1.organisationId;
        })
        cy.readFile('cypress/fixtures/userId.json').then((userId) =>{
            cy.wrap(userId).as('userId');
            userId = userId.userId;
        })
        cy.visit(`/boards/${boardId}/team`);
        cy.url().should("not.include", "login");
    })

    it ("remove user from a board", () => {
        
        cy.intercept(
            "DELETE",
            `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}/users/${userId}/remove-from-boards`)
            .as("successfullyRemovedUser");

        removeMember.removeMember();

        cy.wait("@successfullyRemovedUser").then ((interception) => {
            cy.log(JSON.stringify(interception.response.body));
            expect(interception.response.statusCode).eq(200);
        })
        cy.url().should("include", "team");
    });
});

let boardId
let orgId 
let userId 