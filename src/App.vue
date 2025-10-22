<template>
  <div class="app-container">
    <NavBar />
    <main class="main-content">
      <!-- <router-view></router-view> -->
      <router-view v-slot="{ Component }">
        <!-- include="OtaUpdate,Config,Logs" -->
        <keep-alive include="Config">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<script>
import NavBar from './components/layout/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 200px;
  padding: 2rem;
  min-height: 100vh;
  background-color: #ffffff;
}
</style>
