<template>
  <div>
    <div id="init-admin-wrap">
      <div id="init-admin-head">
        <h2>Init Super Admin</h2>
        <p>gRBAC-Server initial setup is required. An admin user has been created and a password generated. Please use the following password to proceed to installation:</p>
        <code>e7a57e0abb8f461f97e1f7c22bf5d97b</code>
        <p>This may also be found at: path/to/gRBAC-Server/secrets/initialAdminPassword</p>
      </div>
      <div id="init-admin-btn">
        <Button type="primary" size="large" @click="gotoDashbord">Next Step</Button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import '@/styles/global.css'
export default {
  name: 'GeneratePwd',
  data () {
    return {}
  },

  methods: {
    gotoDashbord () {
      // console.log('goto')
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
    height: 80%;
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
