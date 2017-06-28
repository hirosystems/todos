<template>
  <div class="hello">
    <div>
      <h1>Blockstack Todo</h1>
      <p>A decentralized Todo app built on <a href="https://blockstack.org" target="_blank">Blockstack</a></p>
      <button class="btn btn-default" @click.prevent="signIn">Sign In With Blockstack</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
      blockstack: window.blockstack
    }
  },

  methods: {
    signIn () {
      var appOrigin = window.location.origin
      var privateKey = '0be113bd33b0c6d0c7167d3ebf3752531a1358dd44b5883a88d11335f8e13ca3'
      var manifestUrl = appOrigin + '/manifest.json'
      var redirectUrl = appOrigin + '/'
      var scopes = ['store_write']

      var authRequest = this.blockstack.makeAuthRequest(privateKey, appOrigin, manifestUrl, redirectUrl, scopes)
      this.blockstack.redirectUserToSignIn(authRequest)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
