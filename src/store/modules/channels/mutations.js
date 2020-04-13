// import Vue from 'vue';

export const mutations = {
  setChannels(state, { channels }) {
    state.channels = channels;
  },

  setLoading(state, {loadingType, isLoading}) {
    state.loading[loadingType] = isLoading;
  },

  setChannelMessages(state, { channelId, messages }) {
    const index = state.channels.findIndex(
      channel => channel.id === channelId
    );
    if (index === -1) {
      throw new Error('存在しないID');
    }

    if (!state.channels[index].messages) {
      // Vue のリアクティブなルールに則ったミューテーション
      // https://vuex.vuejs.org/ja/guide/mutations.html#vue-%E3%81%AE%E3%83%AA%E3%82%A2%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96%E3%81%AA%E3%83%AB%E3%83%BC%E3%83%AB%E3%81%AB%E5%89%87%E3%81%A3%E3%81%9F%E3%83%9F%E3%83%A5%E3%83%BC%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3
      Vue.set(state.channels[index], 'messages', messages)
    } else {
      state.channels[index].messages = [...messages];
    }
  },
};
