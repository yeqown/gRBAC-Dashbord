<!-- manage users -->
<template>
  <div class="user-wrap">
    <div class="user-head">
      创建新用户
    </div>

    <Table border :columns="columns" :data="users"/>
    <!-- modal -->
    <Modal
      v-model="modalShow"
      :title="`变更角色 - ${selectedUserID}`"
    >
      <Transfer v-if="roles && roles.length"
        :data="roles"
        :target-keys="target_roles"
        :render-format="renderTransferRole"
        :titles="['所有角色', '拥有角色']"
        @on-change="hdlChangeRole"
      />
    </Modal>
    <!-- footer -->
    <div class="user-foot">
      <Page :total="total" :current="page" show-total size="small"></Page>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'User',
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
                  this.selectedUserID = params.row.user_id
                  this.selectedID = params.row.id
                }
              }
            }, '角色变更')
          }
        },
        {
          title: '用户唯一标识',
          key: 'user_id',
          width: 120
        },
        {
          title: '角色清单',
          key: 'roles',
          render: (h, params) => {
            let _row = params.row
            let renderRoles = params.row.roles.map(role => {
              // console.log(role)
              return h('Tag', {
                props: {
                  color: '#00bcd4',
                  closable: true
                },
                on: {
                  'on-close': (evt) => {
                    console.log(this.users[_row._index])
                  }
                }
              }, role.name)
            })
            return h('div', renderRoles)
          }
        },
        {
          title: '权限清单',
          key: 'perms',
          render: (h, params) => {
            let renderPerms = params.row.perms.map(perm => {
              return h('Tag', {
                props: {
                  color: '#00bcd4'
                }
              }, perm.name)
            })
            return h('div', renderPerms)
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
      target_roles: [],
      selectedUserID: '',
      selectedID: '',
      page: 1,
      total: 10
    }
  },

  computed: {
    ...mapGetters({
      users: 'usersMaptoList',
      oriUsers: 'originUsers',
      roles: 'rolesMaptoList'
    })
  },

  methods: {
    ...mapActions([
      'allUsers', 'allRoles', 'assignRole', 'revokeRole'
    ]),

    async hdlChangeRole (newTargetKeys, direction, moveKeys) {
      // console.log(newTargetKeys)
      // console.log(direction)
      // console.log(moveKeys)
      switch (direction) {
        case 'right':
          // console.log('assign')
          for (let i = 0; i < moveKeys.length; i++) {
            let roleId = moveKeys[i]
            await this.assignRole({userId: this.selectedID, roleId})
          }
          break
        case 'left':
          for (let i = 0; i < moveKeys.length; i++) {
            let roleId = moveKeys[i]
            await this.revokeRole({userId: this.selectedID, roleId})
          }
          break
      }
      this.target_roles = newTargetKeys
    },

    renderTransferRole: (role) => {
      return role.name
    }
  },

  watch: {
    modalShow (newVal, oldVal) {
      // means: hide modal
      if (!newVal) {
        this.allUsers({limit: 10, skip: 0})
        return
      }

      let usr = null
      for (let i = 0; i < this.oriUsers.length; i++) {
        let _cur = this.oriUsers[i]
        // console.log('user: ', _cur)
        if (_cur.user_id === this.selectedUserID) {
          usr = _cur
          break
        }
      }

      // did not get current user
      if (!usr) {
        return
      }

      let own_roles = {}
      this.target_roles = []
      usr.roles.map(role => {
        this.target_roles.push(role.id)
        own_roles[role.id] = role
      })
    }
  },

  created () {
    this.allUsers({limit: 10, skip: 0})
    this.allRoles({limit: 10, skip: 0})
  }
}
</script>

<style type="text/css" scoped>
  .user-wrap {
    height: 100%;
  }
  .user-head {
    height: 50px;
    background-color: #00BCD4;
    color: #fff;
    font-size: 2em;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }
  .user-head:hover {
    background-color: #03d2ec;
  }
  .user-foot {
    margin-top: 20px;
  }
</style>
