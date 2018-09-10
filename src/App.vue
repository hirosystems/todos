<template>
  <div id="app">
    <landing v-if="! (new blockstack.UserSession()).isUserSignedIn()"></landing>
    <dashboard v-if="user" :user="user"></dashboard>

    <small class="creds">
      Source code on <a href="https://github.com/blockstack/blockstack-todos" target="_blank">Github</a>
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
    const blockstack = this.blockstack
    const userSession = new blockstack.UserSession()
    if (userSession.isUserSignedIn()) {
      this.userData = userSession.loadUserData()
      this.user = new blockstack.Person(this.userData.profile)
      this.user.username = this.userData.username
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn()
      .then((userData) => {
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
