/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import 'cypress-real-events/support';

declare global {
  namespace Cypress {
    interface Chainable {
      dragTo(dropSelector: string): void;
    }
  }
}

Cypress.Commands.add('dragTo', { prevSubject: 'element' }, function (subject, targetEl) {
  /*
   * Currently realMouseDown etc. only works in browsers based on Chromium.
   * see https://github.com/dmtrKovalenko/cypress-real-events#requirements
   */
  if (Cypress.isBrowser('firefox')) this.skip();
  /*
   * explicit scrollBehavior because default breaks some tests
   */
  cy.wrap(subject)
    .first()
    .realMouseDown({ button: 'left', position: 'center', scrollBehavior: 'nearest' })
    .realMouseMove(10, 0, { position: 'center', scrollBehavior: 'nearest' });
  cy.get(targetEl)
    .first()
    .realMouseMove(10, 0, { position: 'center', scrollBehavior: 'nearest' })
    .realMouseUp({ position: 'center', scrollBehavior: 'center' });
  /*
   * workaround for a problem where the original drag selector did work only once
   */
  cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
});
