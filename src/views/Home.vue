<template>
  <div id="app">
    <landing v-if="! UserSession.isUserSignedIn()"></landing>
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
    this.UserSession = new this.blockstack.UserSession()
  },
  mounted () {
    const UserSession = this.UserSession
    if (UserSession.isUserSignedIn()) {
      this.userData = UserSession.loadUserData()
      this.user = new this.blockstack.Person(this.userData.profile)
      this.user.username = this.userData.username
    } else if (UserSession.isSignInPending()) {
      UserSession.handlePendingSignIn()
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
