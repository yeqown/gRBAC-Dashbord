import Vue from 'vue'
import Vuex from 'vuex'
import perm from './modules/perm'
import role from './modules/role'
import user from './modules/user'

Vue.use(Vuex)

const RequestError = {
  state: {
    error: null
  },
  getters: {
    error: state => state.error
  },
  mutations: {
    setError (state, error) {
      state.error = error
      setTimeout(() => {
        state.error = null
      }, 3000)
      // console.log('222222222', state)
    },

    resetError (state) {
      state.error = null
    }
  }
}

export default new Vuex.Store({
  modules: {
    perm,
    role,
    user,
    RequestError
  }
})
