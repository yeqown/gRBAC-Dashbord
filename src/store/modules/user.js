import {
  getAllUsers,
  revokeRolefromUser,
  assignRoletoUser
} from '@/apis/user'

// initial state
const state = {
  users: []
}

// getters
const getters = {
  usersMaptoList: (state, getters) => {
    // console.log(state)
    let us = state.users
    let new_us = us.map(u => {
      let perms = {}
      let newRoles = Object.keys(u.roles).map(key => {
        let role = u.roles[key]
        perms = Object.assign(perms, role.permissions)
        return role
      })

      let newPerms = Object.keys(perms).map(key => {
        return perms[key]
      })

      u.roles = newRoles
      u.perms = newPerms
      return u
    })
    return new_us
  },

  originUsers: state => state.users
}

// actions for api connect
const actions = {
  addUser ({commit, state}) {
    let user = {
      id: 1,
      userId: '1298173',
      roles: ['12312', '12312'],
      perms: []
    }
    commit('addUser', {user})
  },

  allUsers ({commit, state}, {limit = 10, skip = 0}) {
    console.log('all users')
    getAllUsers({limit, skip}).then(data => {
      commit('refreshUsers', {users: data.users})
    }).catch(err => {
      console.error(err)
      commit('setError', err)
    })
  },

  assignRole ({commit, state}, {userId, roleId}) {
    console.log('assign users')
    assignRoletoUser({user_id: userId, role_id: roleId}).then(data => {
      // console.log(data)
    }).catch(err => {
      console.error(err)
      commit('setError', err)
    })
  },

  revokeRole ({commit, state}, {userId, roleId}) {
    console.log('revoke users')
    revokeRolefromUser({user_id: userId, role_id: roleId}).then(data => {
      // console.log(data)
    }).catch(err => {
      console.error(err)
      commit('setError', err)
    })
  }
}

// mutations for update state ?
const mutations = {
  addUser (state, {user}) {
    state.users.push(user)
  },

  refreshUsers (state, {users}) {
    state.users = users
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
