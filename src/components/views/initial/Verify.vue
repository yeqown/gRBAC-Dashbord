<template>
  <div>
    <div id="init-admin-wrap">
      <div id="init-admin-head">
        <h2>Verify Root-admin Token</h2>
        <p>gRBAC-Server initial setup is required. An admin user has been created and a password generated. Please use the following password to proceed to installation:</p>
        <code>e7a57exxxxxxxxxxxf5d97b</code>
        <p>This may also be found at: path/to/gRBAC-Server/secrets/initialAdminPassword</p>
      </div>

      <div id="init-admin-input">
        <Input placeholder="Input your token here" v-model="verifyToken" size="large"/>
      </div>

      <div id="init-admin-btn">
        <Button
          type="primary"
          size="large"
          :disabled="continueBtnDisabled"
          @click="gotoDashbord">
            Continue
        </Button>
      </div>
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
    background-color: #f5f5f5;
    border-radius: 20px;
    color: #000;
    padding: 4em;
    box-shadow: 5px 5px 5px #888888;
  }

  #init-admin-head {
    min-height: 200px;
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
    background-color: #e6dede;
    color: #ff5722;
  }

  #init-admin-input {
    min-height: 100px;
    height: 20%;
  }

  #init-admin-btn {

  }
</style>
