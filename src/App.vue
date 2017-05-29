<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h1 class="page-header">Blockstack Todo App<small v-if="user"> for {{ user.givenName }} {{  user.familyName }} (<a href="#" @click.prevent="signOut">Sign Out</a>)</small></h1>

          <button class="btn btn-primary"
            v-if="! blockstack.isUserSignedIn()"
            @click.prevent="signIn()"
          >Sign In</button>

          <div v-if="user">

            <form @submit.prevent="addTodo" :disabled="! todo">
              <div class="input-group">
                <input v-model="todo" type="text" class="form-control" placeholder="Write a todo..." autofocus>
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button" :disabled="! todo">Add</button>
                </span>
              </div>
            </form>

            <ul class="list-group">
              <li class="list-group-item" v-for="todo in todos">{{ todo }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted () {
    if (this.blockstack.isUserSignedIn()) {
      let vm = this
      this.blockstack.loadUserData(function (userData) {
        vm.user = userData.profile
      })
    } else if (this.blockstack.isSignInPending()) {
      this.blockstack.signUserIn(function (userData) {
        window.location = window.location.origin
      })
    }
  },
  data () {
    return {
      blockstack: window.blockstack,
      user: null,
      todos: [],
      todo: ''
    }
  },

  methods: {
    signIn () {
      var appDomain = window.location.hostname
      var privateKey = null
      var authRequest = this.blockstack.makeAuthRequest(privateKey, appDomain)
      this.blockstack.redirectUserToSignIn(authRequest)
    },

    signOut () {
      this.blockstack.signUserOut(window.location.href)
    },

    addTodo () {
      if (!this.todo) {
        return
      }
      this.todos.push(this.todo)
      this.todo = ''
    }
  }
}
</script>

<style lang="scss">
#app {
  form {
    margin-bottom: 20px;
  }
}
</style>
