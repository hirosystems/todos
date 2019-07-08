// These functions have been extracted out of Dashboard.js since
// they are the logical functions being tested.

export function jsonCopy(object) {
  return JSON.parse(JSON.stringify(object));
}

// All three functions take in a state and return a list object of tasks
export function remove(index, state) {
  const tasks = jsonCopy(state.tasks);
  tasks.splice(index, 1); // remove subject at index
  return tasks;
}

export function add(state) {
  const task = state.value;
  const tasks = jsonCopy(state.tasks);
  tasks.push([task, false]);
  return tasks;
}

export function check(index, state) {
  const tasks = jsonCopy(state.tasks);
  tasks[index][1] = !tasks[index][1];
  return tasks;
}
