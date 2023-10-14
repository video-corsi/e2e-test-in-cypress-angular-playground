# How to test drag'n'drop features built on top of Angular Material CDK

1. Install cypress-real-events

```
npm install --save-dev cypress-real-events
```


2. Add `cypress-real-events` to `compilerOptions/types` in `cypress/tsconfig.json`, e.g.


```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es6", "dom"],
    "types": ["cypress", "node", "cypress-real-events"],
    "esModuleInterop": true
  },
  "include": ["**/*.ts"]
}
```

3. Create a new useful `dragTo` custom command in `cypress/support/commands.ts`:

```ts
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

```

4. Usage

```ts
cy.get('#foo').dragTo('#bar') (use whatever selectors you want)
```

5. Open `material-dnd-demo.cy.ts` to see some tests and more info 

---

Inspired by a [StackOverflow](https://stackoverflow.com/questions/55361499/how-to-implement-drag-and-drop-in-cypress-test/74094819#74094819) answer
