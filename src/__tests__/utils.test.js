// https://www.sitepoint.com/test-react-components-jest/ tutorial
// was used to inform testing. 

import {add, remove, check} from '../assets/utils.js'


// Tests for check function
test('check crosses off a task', () => {
  const state = {
    tasks: [['Create a Blockstack ID', false]],
    value: ''

  };

  const tasks = check(0, state);

  expect(tasks).toEqual([[
    'Create a Blockstack ID', true
  ]])

});

test('check crosses off the correctly indexed task within a list', () => {
  const state = {
    tasks: [['Create a Blockstack ID', false],
            ['Complete Zero-to-Dapp tutorial', false],
            ['Look at todo list sample', false],
            ['Read about App Mining', false]],
    value: ''
  };

  const tasks = check(2, state);

  expect(tasks).toEqual([
    ['Create a Blockstack ID', false],
    ['Complete Zero-to-Dapp tutorial', false],
    ['Look at todo list sample', true],
    ['Read about App Mining', false] 
  ])

});

test('check function also unchecks a task', () => {
  const state = {
    tasks: [['Create a Blockstack ID', false],
            ['Complete Zero-to-Dapp tutorial', true],
            ['Look at to-do list sample app', true],
            ['Read about App Mining', false]],
    value: ''
  };

  const tasks = check(2, state);

  expect(tasks).toEqual([
    ['Create a Blockstack ID', false],
    ['Complete Zero-to-Dapp tutorial', true],
    ['Look at to-do list sample app', false],
    ['Read about App Mining', false] 
  ])

});



// Tests for add function
test('add function adds task to empty task list', () => {
  const state = {
    tasks: [],
    value: 'Create new app using Blockstack'
  }

  const tasks = add(state);

  expect(tasks).toEqual([
    ['Create new app using Blockstack', false]
  ])

});

test('add function adds task to existing task list', () => {
  const state = {
    tasks: [['Create Blockstack ID', true],
            ['Look at to-do list sample app', true],
            ['Go to dry-cleaners', false]],
    value: 'Create new app using Blockstack'
  }

  const tasks = add(state);

  expect(tasks).toEqual([
    ['Create Blockstack ID', true],
    ['Look at to-do list sample app', true],
    ['Go to dry-cleaners', false],
    ['Create new app using Blockstack', false]
  ])

});

// Tests for remove function
test('remove function removes task from one-task list', () => {
  const state = {
    tasks: [['Take out the trash']],
    value: ''
  };

  const tasks = remove(0, state);

  expect(tasks).toEqual([])

})

test('remove function removes correct task from a list', () => {
  const state = {
    tasks: [['Create a Blockstack ID', false],
            ['Complete Zero-to-Dapp tutorial', true],
            ['Look at to-do list sample app', true],
            ['Read about App Mining', false]],
    value: ''
  }

  const tasks = remove(2, state);

  expect(tasks).toEqual([
    ['Create a Blockstack ID', false],
    ['Complete Zero-to-Dapp tutorial', true],
    ['Read about App Mining', false]  
  ])
});
