<template>
  <div id="app">
    <landing v-if="! userSession.isUserSignedIn()"></landing>
    <dashboard v-if="user" :user="user"></dashboard>

    <small class="creds">
      Source code on <a href="https://github.com/blockstack/blockstack-todos" target="_blank">Github</a>
    </small>
  </div>
</template>

<script>
import Landing from '@/components/Landing.vue'
import Dashboard from '@/components/Dashboard.vue'

export default {
  name: 'Home',
  components: { Landing, Dashboard },
  created () {
    this.userSession = new this.blockstack.UserSession()
    window.userSession = this.userSession
  },
  mounted () {
    const userSession = this.userSession
    if (userSession.isUserSignedIn()) {
      this.userData = userSession.loadUserData()
      this.user = new this.blockstack.Person(this.userData.profile)
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
      userSession: null,
      user: null
    }
  }
}
</script>
