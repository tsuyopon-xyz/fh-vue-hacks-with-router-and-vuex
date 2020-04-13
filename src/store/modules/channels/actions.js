import Channel from '../../../models/Channel';
import Message from '../../../models/Message';

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

  async fetchChannelMessages({ commit }, { channelId }) {
    commit({
      type: 'setLoading',
      loadingType: 'messages',
      isLoading: true
    });
    try {
      const messages = await Message.fetchMessages(channelId);
      commit({
        type: 'setChannelMessages',
        messages,
        channelId
      });
    } catch (error) {
      throw new Error('チャンネル一覧の取得に失敗');
    }
    commit({
      type: 'setLoading',
      loadingType: 'messages',
      isLoading: false
    });
  },

  async postMessage({ commit }, { channelId, body }) {
    commit({
      type: 'setLoading',
      loadingType: 'postMessage',
      isLoading: true
    });
    try {
      const message = await Message.save({
        body,
        channelId
      });
      commit({
        type: 'addMessage',
        channelId,
        message
      });
    } catch (error) {
      alert(error.message);
    }
    commit({
      type: 'setLoading',
      loadingType: 'postMessage',
      isLoading: false
    });
  }
};