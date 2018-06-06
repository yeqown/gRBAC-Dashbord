<!-- manage roles -->
<template>
  <div>
    <div class="role-head" @click="showNewRoleModal">
      创建新角色
    </div>
    <Table border :columns="columns" :data="roles"/>

    <div class="role-foot">
      <Page :total="total" :current="page" show-total
        size="small" @on-change="hdlPageChange"/>
    </div>

    <!--  transfer perm modal -->
    <Modal
      v-model="modalShow"
      title="变更权限"
    >
      <Transfer v-if="perms && perms.length"
        :data="perms"
        :target-keys="target_perms"
        :render-format="renderTransferRole"
        :titles="['未拥有权限', '拥有权限']"
        @on-change="hdlChangePerm"
      />
    </Modal>

    <!-- new role modal -->
    <Modal
      v-model="modalNewRoleShow"
      title="新建角色"
      @on-ok="createRole({name: newRoleForm.roleName})"
    >
      <Form :model="newRoleForm" :label-width="80">
        <FormItem label="新角色名">
          <Input v-model="newRoleForm.roleName"/>
        </FormItem>
      </Form>
    </Modal>
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
          title: '操作',
          width: 120,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'error'
              },
              on: {
                click: (evt) => {
                  this.modalShow = true
                  this.selectID = params.row.id
                }
              }
            }, '权限变更')
          }
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
      ],
      modalShow: false,
      selectID: '',
      modalNewRoleShow: false,
      newRoleForm: {
        roleName: ''
      },
      page: 1,
      target_perms: []
    }
  },

  computed: {
    ...mapGetters({
      roles: 'rolesMaptoList',
      total: 'roleTotal',
      perms: 'originPerms'
    })
  },

  methods: {
    ...mapActions({
      allRoles: 'allRoles',
      createRole: 'createRole',
      allPerms: 'allPerms',
      assignPerm: 'assignPerm',
      revokePerm: 'revokePerm'
    }),

    showNewRoleModal () {
      this.modalNewRoleShow = true
    },

    hdlPageChange (page) {
      this.page = page
    },

    renderTransferRole (role) {
      return role.name
    },

    async hdlChangePerm (newTargetKeys, direction, moveKeys) {
      switch (direction) {
        case 'right':
          for (let i = 0; i < moveKeys.length; i++) {
            let perm_id = moveKeys[i]
            await this.assignPerm({role_id: this.selectID, perm_id})
          }
          break
        case 'left':
          for (let i = 0; i < moveKeys.length; i++) {
            let perm_id = moveKeys[i]
            await this.revokePerm({role_id: this.selectID, perm_id})
          }
          break
      }
      this.target_perms = newTargetKeys
    }

  },

  watch: {
    modalNewRoleShow (newVal, oldVal) {
      if (!newVal) {
        this.allRoles({skip: (this.page - 1) * 10})
      }
    },

    modalShow (newVal, oldVal) {
      // console.log(this.perms)
      if (!newVal) {
        this.allRoles({skip: (this.page - 1) * 10})
        return
      }

      let role = null
      for (let i = 0; i < this.roles.length; i++) {
        let _cur = this.roles[i]
        if (_cur.id === this.selectID) {
          role = _cur
          break
        }
      }

      if (!role) {
        return
      }

      console.log(role)
      // let own_perms = {}
      this.target_perms = []
      role.permissions.map(perm => {
        this.target_perms.push(perm.id)
      })

      console.log(this.target_perms)
    },

    page (newVal, oldVal) {
      this.allRoles({skip: (this.page - 1) * 10})
    }
  },

  created () {
    this.allRoles({skip: (this.page - 1) * 10})
    this.allPerms({limit: 100, skip: 0})
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
