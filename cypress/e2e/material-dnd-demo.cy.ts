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
    // mock HTTP GET
    cy.intercept(
      'https://jsonplaceholder.typicode.com/users',
      { method: 'GET'},
      mock
    )
    // Visit the demo page
    cy.visit('http://localhost:4200/material-dnd-demo')
  });


  it('should be able to drag and drop items', () => {
    // select the element to drag (the first one)
    const sourceIndex = 0;
    cy.get('.my-item').eq(sourceIndex).as('source');

    // select the element in which to drop (the third one)
    const targetIndex = 2;
    cy.get('.my-item').eq(targetIndex).as('target');

    // simulate drag ( Lorenzo is Moved at the position of Silvia )
    // NOTE: use the custom command (available in cypress/support/command.ts)
    cy.get('@source').dragTo('@target')

    // test if the output list has the new order, element after element
    cy.get('.my-item').eq(0).contains('Lorenzo')
    cy.get('.my-item').eq(1).contains('Silvia')
    cy.get('.my-item').eq(2).contains('Fabio')
    cy.get('.my-item').eq(3).contains('Lisa')
  });


  /**
   * this is exactly the same test of the previous one
   * but there are no hard coded values
   * and works with any array content
   */
  it('should be able to drag and drop items (more flexible solution)', () => {
    // select the element to drag (the first one)
    const sourceIndex = 0;
    cy.get('.my-item').eq(sourceIndex).as('source');

    // select the element in which to drop (the third one)
    const targetIndex = 2;
    cy.get('.my-item').eq(targetIndex).as('target');

    // Simulate Drag
    cy.get('@source').dragTo('@target')

    // Simulate the final result that should have the source array after dragging.
    // NOTE: this is a custom function (see at the bottom of this file) that returns a new modified array
    // that simulate the final result after dragging operations.
    const draggedArray: User[] = swapElements(mock, sourceIndex, targetIndex);

    // we iterate over all the items of the list (after dragging)
    // and check if every item contains / matches the right content (got from draggedArray)
    cy
      .get('.my-item')
      .each((el, index) => {
        // check if the every element of the list contains the array item name
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

