import { actions } from '../../../../store/modules/channels/actions';
import Channel from '../../../../models/Channel';
import Message from '../../../../models/Message';

jest.mock('../../../../models/Channel');
jest.mock('../../../../models/Message');

describe('store/modules/channels/actions.jsのテスト', () => {
  const createContext = (callback) => {
    return {
      commit: callback
    }
  };

  const createMockChannels = () => {
    return [{id: 'mockChannelId', name: 'mockChannelName'}]
  };

  const createMockMessages = () => {
    return ['message1', 'message2', 'message3'];
  };

  it('fetchChannelsメソッドのテスト', async () => {
    const mockChannels = createMockChannels();
    const commits = [];
    Channel.fetch.mockResolvedValue(mockChannels);

    const context = createContext((payload) => {
      commits.push(payload)
    });

    await actions.fetchChannels(context);
    expect(commits.length).toStrictEqual(3);
    expect(commits).toStrictEqual([
      {
        type: 'setLoading',
        loadingType: 'channels',
        isLoading: true
      },
      {
        type: 'setChannels',
        channels: mockChannels,
      },
      {
        type: 'setLoading',
        loadingType: 'channels',
        isLoading: false
      }
    ]);
  });

  it('fetchChannelMessagesメソッドのテスト', async () => {
    const mockMessages = createMockMessages();
    const commits = [];
    Message.fetchMessages.mockResolvedValue(mockMessages);

    const context = createContext((payload) => {
      commits.push(payload)
    });
    const payload = {channelId: 'general'}

    await actions.fetchChannelMessages(context, payload);

    expect(commits.length).toStrictEqual(3);
    expect(commits).toStrictEqual([
      {
        type: 'setLoading',
        loadingType: 'messages',
        isLoading: true
      },
      {
        type: 'setChannelMessages',
        messages: mockMessages,
        channelId: payload.channelId
      },
      {
        type: 'setLoading',
        loadingType: 'messages',
        isLoading: false
      }
    ]);
  });

  it('postMessageメソッドのテスト', async () => {
    const mockMessage = 'mockMessage';
    const commits = [];
    Message.save.mockResolvedValue(mockMessage);

    const context = createContext((payload) => {
      commits.push(payload)
    });
    const payload = {
      channelId: 'general',
      body: 'message body'
    };

    await actions.postMessage(context, payload);

    expect(commits.length).toStrictEqual(3);
    expect(commits).toStrictEqual([
      {
        type: 'setLoading',
        loadingType: 'postMessage',
        isLoading: true
      },
      {
        type: 'addMessage',
        message: mockMessage,
        channelId: payload.channelId
      },
      {
        type: 'setLoading',
        loadingType: 'postMessage',
        isLoading: false
      }
    ]);
  });
});
