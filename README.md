# E2E Test in Cypress - Angular Playground

A simple playground to create your first E2E tests in Angular and Cypress.

This is a repository demo for the video courses ["Scrivere E2E test con Cypress"](https://www.fabiobiondi.dev/video-courses/scrivere-e2e-test-con-cypress) (italian)



### Run Angular Project

```bash
npm start
```

### Run Cypress

• Run Cypress UI, select "E2E Testing" and choose `playground.cy.ts` to run the default test. 

```bash
npm run e2e
```

### What you find in this repo:

* an application composed by two routes:
  * `features/home`: a simple page with the text "Hello Angular"
  * `features/material-dnd-demo`: a page that uses Angular Material CDK to create a list that support drag'n'drop

* two cypress tests
  * `cypress/e2e/home.cy.ts`: the E2E test for the hompage
  * `cypress/e2e/material-dnd-demo.cy.ts`: the E2E test to test the drag'n'drop
    * in the same folder you find also the instructions (`README_MATERIAL_DND_DEMO.md`) to replicate everything in your project 



