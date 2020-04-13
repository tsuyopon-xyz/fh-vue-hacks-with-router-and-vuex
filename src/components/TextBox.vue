<template>
  <div class="textbox-container">
    <textarea
      placeholder="ここに入力"
      class="textbox-input"
      v-model.trim="body"
    ></textarea>
    <div class="textbox-button">
      <Button
        title="投稿"
        :onClick="post"
        :clickable="canPost"/>
    </div>
  </div>
</template>

<script>
import Button from './Button';

export default {
  components: {
    Button
  },
  data() {
    return {
      body: ''
    }
  },
  computed: {
    canPost() {
      return !this.$store.state.channels.loading.postMessage;
    }
  },
  methods: {
    async post() {
      try {
        const payload = {
          body: this.body,
          channelId: this.$route.params.channelId
        };

        await this.$store.dispatch('channels/postMessage', payload);
        this.body = '';
      } catch (error) {
        alert(error.message);
      }
    },
  }
}
</script>

<style scoped>
.textbox-container {
  padding: 10px;
}

.textbox-input {
  width: 100%;
  height: 100px;
  resize: none;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0;
}

.textbox-button {
  margin-top: 10px;
  text-align: right;
}
</style>