import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    getCity: {},
    addressId: "",
  },
  mutations: {
    changeCity(state, value) {
      state.getCity = value
    },
    changeAddressId(state,value) {
      state.addressId = value
    },
  },
  actions: {
  },
  modules: {
  }
})
