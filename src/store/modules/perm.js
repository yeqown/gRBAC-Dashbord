import {
  getAllPerms,
  newPerm,
  editPerm
} from '@/apis/perm'

const state = {
  perms: []
}

const getters = {
  originPerms: state => state.perms
}

const actions = {
  allPerms ({commit, state}, {limit = 10, skip = 0}) {
    getAllPerms({limit, skip}).then(data => {
      commit('setPerms', {perms: data.permissions})
    }).catch(err => {
      console.log('err', err)
      commit('setError', err)
    })
  },

  createPerm ({commit, state}, {name, desc}) {
    newPerm({name, desc}).then(data => {
      console.log(data)
    }).catch(err => {
      console.error(err)
      commit('setError', err)
    })
  },

  updatePerm ({commit, state}, {name, desc, id}) {
    editPerm({name, desc, id}).then(data => {
      console.log(data)
    }).catch(err => {
      console.error(err)
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
