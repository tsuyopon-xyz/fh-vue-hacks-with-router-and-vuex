// import Vue from 'vue';

export const mutations = {
  setChannels(state, { channels }) {
    state.channels = channels;
  },

  setLoading(state, {loadingType, isLoading}) {
    state.loading[loadingType] = isLoading;
  },
};
