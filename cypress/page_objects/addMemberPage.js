class AddMember {

    get addTeamMemberBtn () {
        return cy.get("div[class='vs-c-team-member vs-c-team-member__add-btn']");

    }

    get emailInput () {
        return cy.get("input");
    }

    get inviteBtn(){
        return cy.get('[name="save-btn"]');
    }

    addMember(email) {
        this.addTeamMemberBtn.click();
        this.emailInput.type(email);
        this.inviteBtn.click();
      }
}

export const addMember = new AddMember();
