import {
  getAllRoles,
  newRole,
  assignPermtoRole,
  revokePermfromRole
} from '@/apis/role'

const state = {
  roles: [],
  total: 0
}

const getters = {
  rolesMaptoList: state => {
    let roles = state.roles
    let new_roles = roles.map(role => {
      role.permissions = Object.keys(role.permissions).map(perm_key => {
        return role.permissions[perm_key]
      })
      role.disabled = false
      role.key = role.id
      return role
    })
    return new_roles
  },

  roleTotal: state => state.total
}

const actions = {
  allRoles ({commit, state, rootGetters}, {limit = 10, skip = 0}) {
    getAllRoles({limit, skip, token: rootGetters.token}).then(data => {
      if (data.code === 0) {
        commit('setRoles', {roles: data.roles, total: data.total})
        commit('setMessage', '获取角色列表' + data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      commit('setError', err)
    })
  },

  createRole ({commit, state, rootGetters}, {name}) {
    newRole({name, token: rootGetters.token}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', '新建角色' + data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      // console.error(err)
      commit('setError', err)
    })
  },

  assignPerm ({commit, state, rootGetters}, {role_id, perm_id}) {
    assignPermtoRole({role_id, perm_id, token: rootGetters.token}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', '角色增加权限' + data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      // console.error(err)
      commit('setError', err)
    })
  },

  revokePerm ({commit, state, rootGetters}, {role_id, perm_id}) {
    revokePermfromRole({role_id, perm_id, token: rootGetters.token}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', '角色移除权限' + data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      // console.error(err)
      commit('setError', err)
    })
  }
}

const mutations = {
  setRoles (state, {roles, total}) {
    state.roles = roles
    state.total = total
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
