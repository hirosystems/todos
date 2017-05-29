<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h1 class="page-header">Blockstack Todo App <small>for {{ user.givenName }} {{  user.familyName }} (<a href="#" @click.prevent="signOut">Sign Out</a>)</small></h1>

          <form @submit.prevent="addTodo" :disabled="! todo">
            <div class="input-group">
              <input v-model="todo" type="text" class="form-control" placeholder="Write a todo..." autofocus>
              <span class="input-group-btn">
                <button class="btn btn-default" type="button" :disabled="! todo">Add</button>
              </span>
            </div>
          </form>

          <ul class="list-group">
            <li v-for="todo in todos"
              class="list-group-item"
              :class="{completed: todo.completed}"
              :key="todo.id">
              <label>
                <input type="checkbox" v-model="todo.completed">{{ todo.text }}
              </label>
              <a @click.prevent="todos.splice(todos.indexOf(todo), 1)"
                class="delete pull-right"
                href="#">X</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// localStorage persistence
var STORAGE_KEY = 'blockstack-todos'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default {
  name: 'dashboard',
  props: ['user'],
  data () {
    return {
      blockstack: window.blockstack,
      todos: todoStorage.fetch(),
      todo: ''
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  methods: {
    addTodo () {
      if (!this.todo.trim()) {
        return
      }
      this.todos.unshift({
        id: todoStorage.uid++,
        text: this.todo.trim(),
        completed: false
      })
      this.todo = ''
    },

    signOut () {
      this.blockstack.signUserOut(window.location.href)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

input::placeholder {
  color: grey;
}

label {
  margin-bottom: 0;
  // width: 100%;
  cursor: pointer;
  input[type="checkbox"] {
    margin-right: 5px;
  }
}
.list-group-item {
  &.completed label {
    text-decoration: line-through;
  }

  .delete {
    display: none;
  }

  &:hover .delete {
    display: inline;
    color: grey;
    &:hover {
      text-decoration: none;
      color: red;
    }
  }
}
</style>
