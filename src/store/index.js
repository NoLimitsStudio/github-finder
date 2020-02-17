import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAvatar: null,
    userName: null,
    reposNum: null,
    repos: null,
    errors: null
  },
  mutations: {
    setRepos (state, { repos, error }) {
      state.repos = repos
      state.errors = error
    },
    setAuthor (state, { avatar, name, reposNum }) {
      state.userAvatar = avatar
      state.userName = name
      state.reposNum = reposNum
    }
  },
  actions: {
    setRepos ({ commit }, payload) {
      // eslint-disable-next-line no-unused-vars
      let repos, error, avatar, name, reposNum
      axios
        .get(`https://api.github.com/users/${payload}/repos`)
        .then(response => {
          repos = response.data
          error = null
          commit('setRepos', { repos, error })
        })
        .catch(err => {
          error = 'Can`t find this user'
          repos = null
          console.log(err)
          commit('setRepos', { repos, error })
        })
      axios
        .get(`https://api.github.com/users/${payload}`)
        .then(response => {
          avatar = response.data.avatar_url
          name = response.data.name
          reposNum = response.data.public_repos
          error = null
          commit('setAuthor', { avatar, name, reposNum })
        })
        .catch(err => {
          error = 'Can`t find this user'
          avatar = null
          name = null
          reposNum = null
          console.log(err)
          commit('setAuthor', { avatar, name, reposNum })
        })
    }
  },
  getters: {
    getRepos (state) {
      return state.repos
    },
    getError (state) {
      return state.errors
    },
    getAuthor (state) {
      const author = [state.userAvatar, state.userName, state.reposNum]
      return author
    }
  }
})
