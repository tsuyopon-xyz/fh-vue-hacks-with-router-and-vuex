export const getters = {
  getMenuDataList(state) {
    return state.channels.map(channel => {
      return {
        id: channel.id,
        name: channel.name
      };
    })
  },
  getChannelMessages(state) {
    return (id) => {
      const targetChannel = state.channels.find(channel => channel.id === id);
      if (!targetChannel) {
        throw new Error('存在しないID');
      }

      if(!Array.isArray(targetChannel.messages)) {
        return [];
      }

      return [...targetChannel.messages].reverse();
    };
  }
};