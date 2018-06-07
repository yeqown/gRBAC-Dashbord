<template>
  <div class="layout">
    <Layout :style="{height: '100%', 'border-width': 0}">
      <Sider :style="{height: '100%', 'padding-top': '5px'}" :width="300">
        <div id="layout-logo">
          <h1 id="logo-text">gRBAC-Server</h1>
        </div>
        <Menu mode="vertical" theme="dark" width="auto" :active-name="curMenuItem" @on-select="hdlMenuSelect">
          <MenuItem name="User">
            <Icon type="ios-navigate"></Icon>
            用户管理
          </MenuItem>
          <MenuItem name="Role">
            <Icon type="ios-analytics"></Icon>
            角色管理
          </MenuItem>
          <MenuItem name="Perm">
            <Icon type="ios-keypad"></Icon>
            权限管理
          </MenuItem>
          <MenuItem name="About">
            <Icon type="ios-paper"></Icon>
            关于
          </MenuItem>
        </Menu>
      </Sider>

      <Layout :style="{padding: '0 24px 24px 24px'}">
        <Breadcrumb :style="{margin: '24px 0', 'text-align': 'left'}">
          <BreadcrumbItem
            v-for="breadCrumb in breadCrumbs"
            :to="breadCrumb.path"
            :key="breadCrumb.name">{{breadCrumb.breadCrumbName}}
          </BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', 'margin-bottom': '1em'}">
          <!-- children view here -->
          <router-view></router-view>

          <!-- be only showed while Dashbord -->
          <div v-if="this.breadCrumbs.length === 1" id="dashbord-intro">
            <h1>RBAC（Role-Based Access Control，基于角色的访问控制）</h1>
            <div id="dashbord-intro-text">
              <p>就是用户通过角色与权限进行关联。简单地说，一个用户拥有若干角色，每一个角色拥有若干权限。这样，就构造成“用户-角色-权限”的授权模型。在这种模型中，用户与角色之间，角色与权限之间，一般者是多对多的关系。见下图：
              </p>
              <p>强烈建议配合网关使用请求转发，或者gRBAC-server提供RPC调用/HTTP调用。</p>
            </div>
            <img src="@/assets/RBAC.png" class="img"/>
          </div>
        </Content>
        <p>copyright@yeqown 2018</p>
      </Layout>
    </Layout>
  </div>
</template>

<script type="text/javascript">
import {mapGetters} from 'vuex'
import '@/styles/global.css'

export default {
  name: 'Dashbord',
  computed: {
    ...mapGetters({
      breadCrumbs: 'breadCrumbs'
    }),

    curMenuItem () {
      let _curBreadCrumbName = 'User'
      if (this.breadCrumbs && this.breadCrumbs.length) {
        this.breadCrumbs.map(breadCrumb => {
          // console.log(breadCrumb)
          if (breadCrumb.isCur) {
            _curBreadCrumbName = breadCrumb.name
          }
        })
      }
      // console.log("cur path name", _curBreadCrumbName)
      return _curBreadCrumbName
    }
  },
  methods: {
    hdlMenuSelect (name) {
      if (name === 'About') {
        name = '/' + name
      } else {
        name = '/Dashbord/' + name
      }
      this.$router.push(name)
    }
  }
}
</script>

<style type="text/css" scoped>
  .layout{
    height: 100%;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    text-align: left;
  }
  #layout-logo{
    /*height: 100px;*/
    /*flex: 1;*/
    background: #00bcd4;
    color: #fff;
    padding: 1em;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    text-align: center;
    margin-bottom: 5px;
    /*align-items: center;*/
    /*justify-content: center;*/
  }
  #dashbord-intro {
    line-height: 2em;
    font-size: 1.3em;
    text-align: center;
  }
  #dashbord-intro-text {
    text-align: left;
    margin: 20px 0;
  }
</style>
