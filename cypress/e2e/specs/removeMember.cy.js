/// <reference types="Cypress"/>

import { removeMember } from '../../page_objects/removeMemberPage';

let email = window.localStorage.getItem('email');
let boardId = window.localStorage.getItem('boardId');

describe('add new member to board', () => {
    
    before("login test", () => {
        cy.loginViaBackend();
        cy.visit(`/boards/${boardId}/team`);
        cy.url().should("not.include", "login");
    })

    it ("remove user from a board", () => {
        
        cy.intercept(
            "POST",
            `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}/users`)
            .as("successfullyRemovedUser");

        removeMember.removeMember();

        cy.wait("@successfullyRemovedUser").then ((interception) => {
            cy.log(JSON.stringify(interception.response.body));
            expect(interception.response.statusCode).eq(200);
        })
        cy.url().should("include", "team");
    });
});
