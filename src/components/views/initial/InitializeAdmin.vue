<template>
  <div>
    <div id="init-admin-wrap">
      <div id="init-admin-head">
        <h2>Init Steps</h2>
      </div>
      <div id="steps-warp">
        <Steps :current="0">
          <Step title="Generate Password" content="balabala"></Step>
          <Step title="Create Admin Account" content="balabala"></Step>
        </Steps>
      </div>
      <Button type="primary" size="large">Get Started !</Button>
    </div>
  </div>
</template>

<script type="text/javascript">
import '@/styles/global.css'
export default {
  name: 'InitializeAdmin',
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

  #steps-warp {
    min-height: 200px;
    height: 50%;
  }
</style>
