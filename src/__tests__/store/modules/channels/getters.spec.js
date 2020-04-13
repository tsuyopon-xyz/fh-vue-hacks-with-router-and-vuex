import { getters } from '../../../../store/modules/channels/getters';

describe('store/modules/channels/getters.jsのテスト', () => {
  const createMockChannelDataList = () => {
    return {
      channels: [
        {
          id: 'general',
          name: '全体連絡',
          messages: ['gneral1', 'gneral2', 'gneral3']
        },
        {
          id: 'chat',
          name: '雑談部屋',
          messages: ['chat1', 'chat2', 'chat3']
        },
        {
          id: 'self-introduction',
          name: '自己紹介',
          messages: [
            'self-introduction1',
            'self-introduction2',
            'self-introduction3'
          ]
        }
      ]
    };
  };

  it('getMenuDataListメソッドのテスト', () => {
    const state = createMockChannelDataList();
    const results = getters.getMenuDataList(state);
    const expectedResults = state.channels.map(channel => {
      return {
        id: channel.id,
        name: channel.name
      };
    });

    expect(results).toStrictEqual(expectedResults);
  });

  it('getChannelMessagesメソッドのテスト', () => {
    const state = createMockChannelDataList();
    const targetIndex = 1;
    const targetChannel = state.channels[targetIndex];
    const targetId = targetChannel.id;
    const targetMessages = [...targetChannel.messages].reverse();

    const results = getters.getChannelMessages(state)(targetId);

    expect(results).toStrictEqual(targetMessages);
  });
});
