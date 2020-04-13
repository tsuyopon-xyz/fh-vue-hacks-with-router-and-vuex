<template>
  <div>
    <TextBox
      :onPost="addMessage"
      :channelId="$route.params.channelId"/>
    <div class="devider"></div>
    <MessageList :messages="messages($route.params.channelId)" />
    <!-- <Spinner v-if="!initialLoaded" />
    <p class="no-messages" v-else-if="initialLoaded && messages.length === 0">投稿データ0件</p>
    <MessageList v-else :messages="reversedMessages" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TextBox from '@/components/TextBox';
import MessageList from '@/components/MessageList';
// import Spinner from '@/components/Spinner';

import MessageModel from '@/models/Message';

export default {
  components: {
    TextBox,
    MessageList,
    // Spinner
  },
  data() {
    return {
      // messages: [],
      initialLoaded: false
    };
  },
  computed: {
    ...mapGetters({
      messages: 'channels/getChannelMessages'
    }),
    reversedMessages() {
      return this.messages.slice().reverse();
    }
  },
  async created() {
    await this.fetchMessages();
  },
  methods: {
    addMessage(message) {
      this.messages.push(message);
    },
    async fetchMessages() {
      let messages = [];
      try {
        messages = await MessageModel.fetchMessages(this.$route.params.channelId);
      } catch (error) {
        // 読み込み失敗など、何かしらのエラーが発生したら
        // ユーザーにデータの取得が失敗したことを知らせる
        alert(error.message);
      }

      this.messages = messages;
      this.initialLoaded = true;
    }
  },
  watch: {
    '$route': async function() {
      this.initialLoaded = false;
      this.messages = [];
      await this.fetchMessages();
    }
  }
}
</script>

<style scoped>
.devider {
  border-top: 10px solid #ccc;
}

.no-messages {
  text-align: center;
}
</style>