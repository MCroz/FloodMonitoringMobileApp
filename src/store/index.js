import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //current user state
    currentUser: null,
    currentFullName: "",
    mainLayoutDrawer: true,
    serverUrl: "http://localhost/flood-monitoring/"
  },
  mutations: {
    //this is where we will allow setting values
    test (state, data) {
      state.endpointUrl = data
    },
    setCurrentUser (state, data) {
      state.currentUser = data
    },
    removeCurrentUser (state) {
      state.currentUser = null
    },
    setMainLayoutDrawer (state,data) {
      state.mainLayoutDrawer = data
    },
    setServerUrl (state,data) {
      state.serverUrl = data
    }
  },
  actions: {
    
  },
  getters: {
    //This Will Allow Getters
    currentUser: (state) => state.currentUser,
    myname: (state) => state.myname,
    mainLayoutDrawer: (state) => state.mainLayoutDrawer,
    serverUrl: (state) => state.serverUrl
  }
})
