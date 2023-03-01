/// <reference types="Cypress"/>

import { changePermission } from '../../page_objects/changePermissionPage';

let boardId = window.localStorage.getItem('boardId');
let userId = window.localStorage.getItem('userId');

describe('add new member to board', () => {
    
    before("login test", () => {
        cy.loginViaBackend();
        cy.createOrg();
        cy.addBoard();
        cy.addUser();
        cy.visit(`/boards/${boardId}/team`);
        cy.url().should("not.include", "login");
    })
    
    it ("change permission of a team member", () => {
        console.log("boardId", boardId);
        console.log("userId", userId);

        cy.intercept(
            "PUT",
            `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}/users/*`)
            .as("successfullyChangedPermission");

        changePermission.ChangePermission();

        cy.wait("@successfullyChangedPermission").then ((interception) => {
            cy.log(JSON.stringify(interception.response.body));
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body.board_id).eq(parseInt(boardId));
        })
        cy.url().should("include", "team");
    });
});
