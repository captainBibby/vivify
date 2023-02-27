class RemoveMember {

    get getMemberBtn () {
        return cy.get("div[class='vs-c-team-member vs-c-team-member__add-btn']");

    }

    get removeBtn () {
        return cy.get("div[class='vs-c-btn vs-c-btn--spaced vs-c-btn--warning vs-u-pull--left']");
    }

    get confirmActionBtn(){
        return cy.get("div[class='el-button el-button--success el-button']");
    }

    removeMember() {
        this.getMemberBtn.click();
        this.removeBtn.click();
        this.confirmActionBtn.click();
      }
}

export const removeMember = new RemoveMember();
