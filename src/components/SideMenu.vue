<template>
  <aside class="menu">
    <ul class="menu-list">
      <template v-for="{id, name} in menuDataList">
        <router-link
          :to="id"
          tag="li"
          class="menu-list-title"
          :key="id"
        >
          <a class="menu-list-title-link">{{ name }}</a>
        </router-link>
      </template>
    </ul>
  </aside>
</template>

<script>
import ChannelModel from '../models/Channel';

export default {
  async created() {
    const channels = await ChannelModel.fetch();
    this.menuDataList = channels;
  },

  data() {
    return {
      menuDataList: []
    }
  }
}
</script>

<style scoped>
.menu {
  position: fixed;
  width: 199px;
  height: 100vh;
  background: #eee;
  border-right: 1px solid black;
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
}

.menu-list-title {
  border-bottom: 1px solid black;
  height: 40px;
  line-height: 40px;
}

.menu-list-title-link {
  text-decoration: none;
  display: block;
  color: black;
  font-size: 0.8em;
}

.menu-list-title-link:hover,
.router-link-exact-active .menu-list-title-link {
  font-size: 1em;
  background-color: #555;
  color: white;
  font-weight: bold;
}
</style>