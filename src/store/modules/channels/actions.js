import Channel from '../../../models/Channel';
// import Message from '../../../models/Message';

export const actions = {
  async fetchChannels({ commit }) {
    commit({
      type: 'setLoading',
      loadingType: 'channels',
      isLoading: true
    });
    try {
      const channels = await Channel.fetch();
      commit({
        type: 'setChannels',
        channels
      });
    } catch (error) {
      throw new Error('チャンネル一覧の取得に失敗');
    }
    commit({
      type: 'setLoading',
      loadingType: 'channels',
      isLoading: false
    });
  },

};