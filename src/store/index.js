import Vue from 'vue'
import Vuex from 'vuex'
import {
  state as channelState,
  getters as channelGetters,
  mutations as channelMutations,
  actions as channelActions,
} from './modules/channels';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    channels: {
      namespaced: true,
      state: channelState,
      getters: channelGetters,
      mutations: channelMutations,
      actions: channelActions
    }
  }
})
