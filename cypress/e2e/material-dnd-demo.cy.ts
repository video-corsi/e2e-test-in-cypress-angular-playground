import 'cypress-real-events/support';

import { User } from '../../src/app/features/material-dnd-demo/material-dnd-demo.component';

const mock: User[] = [
  { id: 1001, name: '1. Fabio' },
  { id: 2001, name: '2. Lorenzo' },
  { id: 3001, name: '3. Silvia' },
  { id: 4001, name: '4. Lisa' },
];

describe('Angular Material Drag and Drop Test', () => {
  beforeEach(() => {
    cy.intercept(
      'https://jsonplaceholder.typicode.com/users',
      { method: 'GET'},
      mock
    )
    cy.visit('http://localhost:4200/material-dnd-demo')
  });


  it('should be able to drag and drop items', () => {
    // select the element to drag (the first one)
    const sourceIndex = 0;
    cy.get('.my-item').eq(sourceIndex).as('source');

    // select the element in which to drop (the third one)
    const targetIndex = 2;
    cy.get('.my-item').eq(targetIndex).as('target');

    // Custom command (see cypress/support/command.ts)
    // simulate drag ( Lorenzo is Moved at the position of Silvia )
    cy.get('@source').dragTo('@target')

    // test if the output has the new order
    cy.get('.my-item').eq(0).contains('Lorenzo')
    cy.get('.my-item').eq(1).contains('Silvia')
    cy.get('.my-item').eq(2).contains('Fabio')
    cy.get('.my-item').eq(3).contains('Lisa')
  });


  /**
   * this is exactly the same test of the previous one
   * but there are no hard coded values
   * and works with any array content and array length
   */
  it('should be able to drag and drop items (more flexible solution)', () => {
    // select the element to drag (the first one)
    const sourceIndex = 0;
    cy.get('.my-item').eq(sourceIndex).as('source');

    // select the element in which to drop (the third one)
    const targetIndex = 2;
    cy.get('.my-item').eq(targetIndex).as('target');

    // Custom command (see cypress/support/command.ts)
    cy.get('@source').dragTo('@target')

    // Simulate the final result of the array after dragging
    // NOTE: useful to check if every item contains the right content after dragging
    const draggedArray: User[] = swapElements(mock, sourceIndex, targetIndex);

    // we iterate on HTML and check if every item in the list
    // contains the right content (got from draggedArray
    cy
      .get('.my-item')
      .each((el, index) => {
        // check if the first HTML element contains the new order
        cy
          .wrap(el)
          .contains(draggedArray[index].name)
      })
  });

});


/**
 * Utility to manipulate an array
 * and simulate the final result of a drag operation
 * @param arrayToSwap   the source
 * @param fromIndex     source: index to move
 * @param toIndex       target: the destination index
 */
function swapElements(arrayToSwap: any[], fromIndex: number, toIndex: number) {
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= arrayToSwap.length || toIndex >= arrayToSwap.length) {
    // Check if the indices are within the valid range of the array.
    console.error('Invalid indices');
    return [];
  }
  const clonedArray = structuredClone(arrayToSwap);

  const element = clonedArray[fromIndex];
  clonedArray.splice(fromIndex, 1);
  clonedArray.splice(toIndex, 0, element);

  return clonedArray
}

