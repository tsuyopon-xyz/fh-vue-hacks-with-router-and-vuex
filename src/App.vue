<template>
  <div>
    <Header />
    <div class="app-container">
      <SideMenu />
      <main class="main-container">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import 'normalize.css';

import Header from './components/Header';
import SideMenu from './components/SideMenu';

export default {
  components: {
    Header,
    SideMenu
  }
}

</script>

<style>
.app-container {
  display: flex;
  padding-top: 60px;
}

.main-container {
  width: calc(100% - 200px);
  flex: 1;
  position: absolute;
  left: 200px;
}
</style>
