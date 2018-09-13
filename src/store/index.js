import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import perm from './modules/perm'
import role from './modules/role'
import user from './modules/user'

import {verify} from '@/apis/auth'

Vue.use(Vuex)

const RequestError = {
  state: {
    error: null,
    message: null,
    verified: false,
    token: ''
  },
  getters: {
    error: state => state.error,
    message: state => state.message,
    verified: state => state.verified,
    token: state => state.token
  },
  mutations: {
    setError (state, error) {
      state.error = error
      let {code = 0} = error
      // token valid code
      if (code === 666) {
        state.verified = false
        state.token = ''
      }

      setTimeout(() => {
        state.error = null
      }, 3000)
    },
    setMessage (state, message) {
      state.message = message
      setTimeout(() => {
        state.message = null
      }, 3000)
    },
    setVerified (state, {verified, token}) {
      state.verified = verified
      state.token = token
    },
    resetError (state) {
      state.error = null
    }
  },
  actions: {
    verifyClient ({commit, state}, {secret}) {
      verify({secret}).then(data => {
        if (data.code === 0) {
          commit('setVerified', {token: data.token, verified: data.verified})
          return
        }
        commit('setError', {message: '验证未通过！'})
      }).catch(err => {
        commit('setError', err)
      })
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
