class ChangePermission {

    get dropMenu () {
        return cy.get(".vs-c-team-member__role");

    }

    get dropMenuItem () {
        return cy.get(".el-dropdown-menu__item");
    }

    ChangePermission() {
        this.dropMenu.click();
        this.dropMenuItem.eq(2).click();
      }
}

export const changePermission = new ChangePermission();
