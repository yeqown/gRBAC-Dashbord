<template>
  <div class="layout">
    <Layout :style="{height: '100%', 'border-width': 0}">
      <Sider :style="{height: '100%', 'padding-top': '5px'}" :width="300">
        <div id="layout-logo">
          <h1 id="logo-text">gRBAC-Admin</h1>
        </div>
        <Menu mode="vertical" theme="dark" width="auto" active-name="user" @on-select="hdlMenuSelect">
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
          <BreadcrumbItem>Dashbord</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', 'margin-bottom': '1em'}">
          <router-view></router-view>
        </Content>
        <p>copyright@yeqown 2018</p>
      </Layout>
    </Layout>
  </div>
</template>

<script type="text/javascript">
import '@/styles/global.css'

export default {
  name: 'Dashbord',

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
  #logo-text {
  }
</style>
