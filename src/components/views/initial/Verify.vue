<template>
  <div>
    <div id="init-admin-wrap">
      <div id="init-admin-head">
        <h2 style="color:#fff">Verify Secret</h2>
        <p style="color:#eee">gRBAC-Server initial secret is required. An admin-roled user has been created, and a password generated. Please use the following password to proceed installation:</p>
        <br><br>
        <code>path/to/gRBAC-Server/secrets/initialAdminPassword</code>
      </div>

      <div id="init-admin-input">
        <input placeholder="input your secret here..." v-model="verifyToken" size="large"/>
      </div>

      <a @click="gotoDashbord" id="verify-btn"> Verify </a>
      <!-- <button
        type="primary"
        :disabled="continueBtnDisabled"
        @click="gotoDashbord">
          Verify
      </button> -->
      <!-- <div id="init-admin-btn">
      </div> -->
    </div>
  </div>
</template>

<script type="text/javascript">
import '@/styles/global.css'
import {mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  name: 'Verify',
  data () {
    return {
      verifyToken: '',
      continueBtnDisabled: false,
      restSecs: 0
    }
  },

  computed: {
    ...mapGetters({
      verified: 'verified'
    })
  },

  methods: {
    ...mapMutations({
      setVerified: 'setVerified',
      setError: 'setError'
    }),

    ...mapActions({
      verifyClient: 'verifyClient'
    }),

    gotoDashbord () {
      if (this.continueBtnDisabled) {
        return
      }

      this.verifyClient({secret: this.verifyToken})
    }
  },

  watch: {
    verified (newVal, oldVal) {
      if (newVal) {
        this.$router.push({path: '/Dashbord/User'})
      }
    }
  },

  created () {
    if (this.verified) {
      this.$router.push('Dashbord')
    }
  }
}
</script>

<!-- <style>
  @import '~@/styles/global.css'
</style> -->

<style type="text/css" scoped>
  #init-admin-wrap {
    width: 60%;
    height: 50%;
    min-height: 500px;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* background-color: #00BCD4; */
    background-color: #778d9e;
    /* border-radius: 20px; */
    color: #fff;
    padding: 4em;
    /* box-shadow: 5px 5px 5px #888888; */
  }

  #init-admin-head {
    min-height: 150px;
    height: 60%;
  }
  #init-admin-head > p {
    text-indent: 2em;
    text-align: left;
    font-size: 1.5em;
  }

  #init-admin-head > code {
    text-align: center;
    font-size: 1.5em;
    padding: 5px;
    background-color: #e6dede;
    color: #ff5722;
  }

  #init-admin-input {
    min-height: 50px;
    height: 20%;
  }

  #verify-btn {
    font-size: 2em;
    color:#cac2c2;
    text-decoration-line: underline;
  }

  #verify-btn:hover {
    cursor: pointer;
    color: #fff;
  }

  /* button {
    font-size: 1.5em;
    min-width: 80px;
    padding: 0.3em;
    border: none;
    color: red;
    background-color: #fff;
  }

  button:hover{
    cursor: pointer;
    background-color: #eee;
  } */

  input {
    font-size: 1.5em;
    padding: 0.5em;
    width: 100%;
    border: none;
    background-color: #e3e5e6;
  }
</style>
