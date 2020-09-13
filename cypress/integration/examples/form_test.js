describe('Testing our Form', () =>{
    beforeEach(function () {
        cy.visit('http://localhost:3000');
        cy.get('[href="/pizza"]').click();
    });
    it('Get the name input and input the name', () =>{
        cy.get('[data-cy="name-input"]')
        .type("Brittany Canty")
        .should("have.value", "Brittany Canty")
        .clear();
        cy.contains("Name is a required field.");
        cy.get('[data-cy="submit"]').should('be.disabled')
    });

    it('get checkbox attribute and test if the user can check and uncheck toppings', () =>{
        cy.get('[data-cy="checkbox"]')
        .check()
        .should('be.checked')
        .uncheck();
    });
    it('Testing the Submit button', () => {
        cy.get('[data-cy="name-input"]')
        .type("Brittany")
        .should("have.value", "Brittany");
        cy.get('[data-cy="checkbox"]')
        .check()
        .should('be.checked');
        cy.get('[data-cy="submit"]')
        .click();
    })
});