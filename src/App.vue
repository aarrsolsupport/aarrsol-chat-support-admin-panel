<template>
  <div>
    <loader-component v-if="isLoader" />
    <template v-if="$route.path=='/login'">
      <router-view/>
    </template>
    <template v-else>
      <header-component/>
      <section class="chat-borad-wrapper">
        <div class="container-fluid  borad-container">
          <div class="chat-borad-con">
            <sidebar-component/>
          </div>
          <div class="borad-inner-body-sec">
            <router-view/>
          </div>
        </div>
      </section>
    </template>
	</div>
</template>

<script>

import HeaderComponent from './components/HeaderComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import LoaderComponent from './components/LoaderComponent.vue'
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    'loader-component': LoaderComponent,
    'header-component': HeaderComponent,
    'sidebar-component': SidebarComponent,
  },
  mounted(){
    if(!localStorage.getItem('_token') && localStorage.getItem('_token') == null){
      this.$router.push('/login')
    }
  },
  computed : {
    ...mapState([
      'isLoader', 'loggedIn', 'authData'
    ])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
