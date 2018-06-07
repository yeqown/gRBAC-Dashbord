import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import perm from './modules/perm'
import role from './modules/role'
import user from './modules/user'

Vue.use(Vuex)

const RequestError = {
  state: {
    error: null,
    message: null,
    verified: false
  },
  getters: {
    error: state => state.error,
    message: state => state.message,
    verified: state => state.verified
  },
  mutations: {
    setError (state, error) {
      state.error = error
      setTimeout(() => {
        state.error = null
      }, 3000)
      // console.log('222222222', state)
    },

    setMessage (state, message) {
      state.message = message
      setTimeout(() => {
        state.message = null
      }, 3000)
    },

    setVerified (state, verified) {
      state.verified = verified
    },

    resetError (state) {
      state.error = null
    }
  }
}

const BreadCrumb = {
  state: {
    breadCrumbs: []
  },
  getters: {
    breadCrumbs: state => state.breadCrumbs
  },
  mutations: {
    setBreadCrumbs (state, breadCrumbs) {
      state.breadCrumbs = breadCrumbs
    }
  }
}

export default new Vuex.Store({
  modules: {
    perm,
    role,
    user,
    RequestError,
    BreadCrumb
  },
  plugins: [createPersistedState()] // state 持久化
})
