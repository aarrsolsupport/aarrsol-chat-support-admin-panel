<template>
    <div>
        <loader-component v-if="isLoader" />
        <template v-if=" $route.path == '/login' ">
            <router-view />
        </template>
        <template v-else-if="authData">
            <component :is="headerComponent"></component>
            <section class="chat-borad-wrapper">
                <div class="container-fluid borad-container">
                    <div class="chat-borad-con">
                        <component :is="sidebarComponent"></component>
                    </div>
                    <router-view />
                </div>
            </section>
        </template>
    </div>
</template>

<script>
import LoaderComponent from './components/LoaderComponent.vue'
import {defineAsyncComponent} from "vue";
import { mapState } from 'vuex';

export default {
    name: 'App',
    components: {
        'loader-component': LoaderComponent,
    },
    computed: {
        ...mapState([
            'isLoader', 'loggedIn', 'authData'
        ]),
        headerComponent () {
            return defineAsyncComponent(() => import(`@/components/HeaderComponent.vue`))
        },
        sidebarComponent () {
            return defineAsyncComponent(() => import(`@/components/SidebarComponent.vue`))
        }
    },
    mounted() {
        if (!localStorage.getItem('_token') && localStorage.getItem('_token') == null) {
            this.$router.push('/login')
        }
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    margin-top: 60px;
}
</style>
