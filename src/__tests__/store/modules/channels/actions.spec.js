import { actions } from '../../../../store/modules/channels/actions';
import Channel from '../../../../models/Channel';
// import Message from '../../../../models/Message';

jest.mock('../../../../models/Channel');
// jest.mock('../../../../models/Message');

describe('store/modules/channels/actions.jsのテスト', () => {
  const createContext = (callback) => {
    return {
      commit: callback
    }
  };

  const createMockChannels = () => {
    return [{id: 'mockChannelId', name: 'mockChannelName'}]
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
});
