<!-- manage roles -->
<template>
  <div>
    <div class="role-head">
      创建新角色
    </div>
    <Table border :columns="columns" :data="roles"/>

    <div class="role-foot">
      <Page :total="10" :current="1" show-total size="small"/>
    </div>
  </div>
</template>

<script type="text/javascript">
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Role',
  data () {
    return {
      columns: [
        {
          title: '角色唯一标识',
          key: 'id',
          width: 200
        },
        {
          title: '角色名',
          key: 'name'
        },
        {
          title: '拥有权限',
          key: 'perms',
          render: (h, params) => {
            let _row = params.row
            // console.log(_row)
            let _renderRow = _row.permissions.map(role => {
              return h('Tag', {
                props: {
                  color: '#00bcd4'
                }
              }, role.name)
            })
            return h('div', _renderRow)
          }
        },
        {
          title: '更新时间',
          key: 'updateTime'
        },
        {
          title: '创建时间',
          key: 'createTime'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      roles: 'rolesMaptoList'
    })
  },
  methods: {
    ...mapActions({
      allRoles: 'allRoles'
    })
  },
  created () {
    this.allRoles({limit: 10, skip: 0})
  }
}
</script>

<style type="text/css" scoped>
  #roles-wrap {
    /*min-height: 500px;*/
  }
  .role-item-wrap {
    /*width: 100%;*/
    /*max-width: 600px;*/
    min-height: 150px;
    background-color: #00bcd4;
    margin: 20px;
    border-radius: 20px;
    /*float: left;*/
  }
  .role-head {
    height: 50px;
    line-height: 50px;
    font-size: 2em;
    background-color: #00BCD4;
    color: #fff;
    text-align: center;
  }
  .role-head:hover {
    background-color: #03d2ec;
  }
  .role-foot {
    margin-top: 20px;
  }
</style>
