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
  allRoles ({commit, state}, {limit = 10, skip = 0}) {
    getAllRoles({limit, skip}).then(data => {
      if (data.code === 0) {
        commit('setRoles', {roles: data.roles, total: data.total})
        commit('setMessage', data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      commit('setError', err)
    })
  },

  createRole ({commit, state}, {name}) {
    newRole({name}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      // console.error(err)
      commit('setError', err)
    })
  },

  assignPerm ({commit, state}, {role_id, perm_id}) {
    assignPermtoRole({role_id, perm_id}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      // console.error(err)
      commit('setError', err)
    })
  },

  revokePerm ({commit, state}, {role_id, perm_id}) {
    revokePermfromRole({role_id, perm_id}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', data.message)
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
