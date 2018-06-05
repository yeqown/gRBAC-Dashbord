import {
  getAllRoles,
  newRole,
  assignPermtoRole,
  revokePermfromRole
} from '@/apis/role'

const state = {
  roles: []
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
  }
}

const actions = {
  allRoles ({commit, state}, {limit = 10, skip = 0}) {
    getAllRoles({limit, skip}).then(data => {
      commit('setRoles', {roles: data.roles})
    }).catch(err => {
      commit('setError', err)
    })
  },

  createRole ({commit, state}, {name}) {
    newRole({name}).then(data => {
      // console.log(data)
    }).catch(err => {
      // console.error(err)
      commit('setError', err)
    })
  },

  assignPerm ({commit, state}, {role_id, perm_id}) {
    assignPermtoRole({role_id, perm_id}).then(data => {
      // console.log(data)
    }).catch(err => {
      // console.error(err)
      commit('setError', err)
    })
  },

  revokePerm ({commit, state}, {role_id, perm_id}) {
    revokePermfromRole({role_id, perm_id}).then(data => {
      // console.log(data)
    }).catch(err => {
      // console.error(err)
      commit('setError', err)
    })
  }
}

const mutations = {
  setRoles (state, {roles}) {
    state.roles = roles
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
