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
  }
}

const actions = {
  allPerms ({commit, state}, {limit = 10, skip = 0}) {
    getAllPerms({limit, skip}).then(data => {
      if (data.code === 0) {
        commit('setPerms', {perms: data.permissions})
        commit('setMessage', '获取权限列表' + data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      // console.log('err', err)
      commit('setError', err)
    })
  },

  createPerm ({commit, state}, {name, desc}) {
    newPerm({name, desc}).then(data => {
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

  updatePerm ({commit, state}, {name, desc, id}) {
    editPerm({name, desc, id}).then(data => {
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
  setPerms (state, {perms}) {
    state.perms = perms
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
