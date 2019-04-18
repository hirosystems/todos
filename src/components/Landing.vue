<template>
  <div class="hello">
    <div>
      <h1>Blockstack Todo</h1>
      <p>A decentralized Todo app built on <a href="https://blockstack.org" target="_blank">Blockstack</a></p>
      <button class="btn btn-default bg-white" @click.prevent="signIn">Sign In With Blockstack</button>
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
      const UserSession = new this.blockstack.UserSession(['store_write', 'publish_data'])
      UserSession.redirectToSignIn()
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
