class RemoveMember {

    get getMemberBtn () {
        return cy.get("div[class='vs-c-team-member__avatar']").eq(0);
    }

    get removeBtn () {
        return cy.get ("button").contains ("Remove from all Boards");
    }

    get confirmActionBtn(){
        return cy.get("button").contains ("Yes");
    }

    removeMember() {
        this.getMemberBtn.trigger ('mouseover', {force : true}).click({ force : true });
        this.removeBtn.click();
        this.confirmActionBtn.click();
      }
}

export const removeMember = new RemoveMember();
