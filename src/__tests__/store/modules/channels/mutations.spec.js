import { mutations } from '../../../../store/modules/channels/mutations';

describe('store/modules/channels/mutations.jsのテスト', () => {
  const createMockStateWithoutChannels = () => {
    return {
      channels: [],
    };
  };

  const createMockStateWithLoading = () => {
    return {
      loading: {
        channels: false,
        messages: false
      }
    };
  };

  const createMockStateWithChannel = () => {
    return {
      channels: [
        {
          id: 'general',
          messages: []
        }
      ]
    };
  };

  it('setChannelsメソッドのテスト', () => {
    const state = createMockStateWithoutChannels();
    const newChannels = ['new channel', 'new channel2'];
    const payload = { channels: newChannels };

    mutations.setChannels(state, payload);
    expect(state).toStrictEqual({
      channels: [...newChannels]
    });
  });

  describe('setLoadingメソッドのテスト', () => {
    it('channelsのフラグ動作確認', () => {
      const state = createMockStateWithLoading();
      const loadingType = 'channels';

      mutations.setLoading(state, { loadingType, isLoading: true });
      expect(state).toStrictEqual({
        loading: {
          channels: true,
          messages: false
        }
      });

      mutations.setLoading(state, { loadingType, isLoading: false });
      expect(state).toStrictEqual({
        loading: {
          channels: false,
          messages: false
        }
      });
    });

    it('messages のフラグ動作確認', () => {
      const state = createMockStateWithLoading();
      const loadingType = 'messages';

      mutations.setLoading(state, { loadingType, isLoading: true });
      expect(state).toStrictEqual({
        loading: {
          channels: false,
          messages: true
        }
      });

      mutations.setLoading(state, { loadingType, isLoading: false });
      expect(state).toStrictEqual({
        loading: {
          channels: false,
          messages: false
        }
      });
    });
  });

  it('setChannelMessagesメソッドのテスト', () => {
    const state = createMockStateWithChannel();
    const newMessages = ['new message1', 'new message2'];
    const payload = {
      channelId: state.channels[0].id,
      messages: newMessages
    };

    mutations.setChannelMessages(state, payload);
    expect(state).toStrictEqual({
      channels: [
        {
          id: state.channels[0].id,
          messages: [...newMessages]
        }
      ]
    });
  });

  it('addMessageメソッドのテスト', () => {
    const state = createMockStateWithChannel();
    const payload = {
      channelId: state.channels[0].id,
      message: 'message',
    };

    mutations.addMessage(state, payload);
    expect(state).toStrictEqual({
      channels: [
        {
          id: state.channels[0].id,
          messages: [payload.message]
        }
      ]
    });
  });
});
