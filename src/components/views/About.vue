<template>
  <div style="height: 100%">
    <!-- gRBAC -->
    <div class="text-wrap black-color">
      <div class="text-inner-wrap">
        <h1>
          <a href="https://github.com/ne7ermore/gRBAC" _blank="#">
            ne7ermore/gRBAC
          </a>
        </h1>
        All Based
        <p>简介：gRBAC项目是基于golang实现的RBAC工具库，内部使用了mongoDB作为数据持久化载体。</p>
      </div>
    </div>

    <!-- gRBAC-Server Api -->
    <div class="text-wrap">
      <div class="text-inner-wrap">
        <h1>
          <a href="https://github.com/yeqown/gRBAC-server" _blank="#">
          yeqown/gRBAC-Server
          </a>
        </h1>
        API & RPC calling support
        <p>简介：gRBAC-Server是基于gRBAC包装的管理平台，主要提供API和RPC两种调用方式，API用于数据管理和鉴权接口调用，RPC用于鉴权调用。</p>
        <p>推荐使用方法：作为独立模块支持引入项目，这也是编写gRBAC-Server的主要目的。通过一个网关程序来鉴权（即 调用gRBAC-Server鉴权接口）</p>
      </div>
    </div>

    <!-- gRBAC-Server View -->
    <div class="text-wrap black-color">
      <div class="text-inner-wrap">
        <h1>
          <a href="https://github.com/yeqown/gRBAC-server-view" _blank="#">
            yeqown/gRBAC-Server-View
          </a>
        </h1>
        view support
        <p>利用了Vue界面框架，iview UI库，及vue相关工具（vue-router, vuex, vuex-persistedstate）开发而来的单页面程序。
        主要作用是为gRBAC-server提供给页面管理工具。</p>
      </div>
    </div>
  </div>

</template>

<script type="text/javascript">
export default {
  name: 'About'
}
</script>

<style type="text/css" scoped>
  .text-wrap {
    width: 100%;
    height: 50%;
    /*background-color: #00bcd4;*/
    /*background-color: #f3f3f3;*/
    background-color: #fff;
    color: #000;
    padding: 2em;
    font-size: 1.3em;
  }
  .text-inner-wrap {
    width: 50%;
    margin: 0 auto;
  }
  .text-inner-wrap > p {
    text-align: left;
    margin-top: 1em;
    line-height: 2em;
  }
  .black-color {
    background-color: #353535;
    color: #fff;
  }
</style>
