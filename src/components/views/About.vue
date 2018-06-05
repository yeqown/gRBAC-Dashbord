<template>
  <div style="height: 100%">
    <img src="@/assets/grbac.png"/>
    <div id="about-head" />
    <div id="text-bk">
      <h2>gRBAC-Server Platform</h2>
      <h2>gRBAC-Server Based on <a href="https://github.com/ne7ermore/gRBAC" _blank="#">ne7ermore/gRBAC</a></h2>
    </div>

  </div>

</template>

<script type="text/javascript">
export default {
  name: 'About'
}
</script>

<style type="text/css" scoped>
  img {
    height: 52%;
    z-index: 99;
    position: absolute;
    margin: 0 auto;
    right: 0;
    left: 0;
  }
  #about-head {
    width: 100%;
    height: 40%;
    background-color: #00bcd4;
  }
  #text-bk {
    width: 100%;
    height: 60%;
    opacity: 0.8;
    background-color: #000;
    color: #fff;
    padding-top: 120px;
  }
</style>
