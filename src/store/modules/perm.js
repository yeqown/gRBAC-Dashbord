import {
  getAllPerms,
  newPerm,
  editPerm
} from '@/apis/perm'

const state = {
  perms: [],
  total: 0
}

const getters = {
  originPerms: state => {
    return state.perms.map(perm => {
      perm.key = perm.id
      perm.disabled = false
      return perm
    })
  },
  totalPerms: state => state.total
}

const actions = {
  allPerms ({commit, state, rootGetters}, {limit = 10, skip = 0}) {
    getAllPerms({limit, skip, token: rootGetters.token}).then(data => {
      if (data.code === 0) {
        commit('setPerms', {perms: data.permissions, total: data.total})
        commit('setMessage', '获取权限列表' + data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      // console.log('err', err)
      commit('setError', err)
    })
  },

  createPerm ({commit, state, rootGetters}, {name, desc}) {
    newPerm({name, desc, token: rootGetters.token}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', '新建权限' + data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      // console.error(err)
      commit('setError', err)
    })
  },

  updatePerm ({commit, state, rootGetters}, {name, desc, id}) {
    editPerm({name, desc, id, token: rootGetters.token}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', '更新权限' + data.message)
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
  setPerms (state, {perms, total}) {
    state.perms = perms
    state.total = total
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
