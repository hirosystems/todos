<template>
  <div id="app">
    <landing v-if="! blockstack.isUserSignedIn()"></landing>
    <dashboard v-if="user" :user="user"></dashboard>

    <small class="creds">
      Hosted by <a href="https://netlify.com" target="_blank">Netlify</a><br/>
      Source code on <a href="https://github.com/michaelstivala/blockstack-todo" target="_blank">Github</a>
    </small>
  </div>
</template>

<script>

import Landing from './components/Landing.vue'
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'app',
  components: {Landing, Dashboard},
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
      user: null
    }
  }
}
</script>

<style src="./assets/sass/app.scss" lang="scss"></style>
