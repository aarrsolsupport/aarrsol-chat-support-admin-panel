<template>
    <div class="sidebar-menu-sec" v-if="this.authData">
        <div class="sidebar-menu-con">
            <div class="sidebar-menu-list">
                <div class="sidebar-menu-item" v-for="(item, index) in menu[this.authData.role_id]" :key="index" :class="$route.path == menu_items[item].path ? 'active': ''">
                    <router-link :to="menu_items[item].path">
                        <div class="menu-item-con">
                            <div class="menu-item-img header-admin-btn">
                                <img :src="menu_items[item].icon" alt="">
                            </div>
                            <div class="thm-heading">
                                <h2>{{ menu_items[item].name }}</h2>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'SidebarComponent',
    computed: {
        ...mapState([
            'origin_path', 'authData'
        ]),
    },
    data() {
        return {
            menu_items: {
                'dashboard': { 'name': 'Dashboard', 'path': '/', 'icon': require('@/assets/images/dashboard-icon.svg') },
                'chatflow': { 'name': 'Chat Flow', 'path': '/chat-flow', 'icon': require('@/assets/images/chat-flow-icon.svg'), },
                'operators': { 'name': 'Operators', 'path': '/operators', 'icon': require('@/assets/images/operator-icon.svg') },
                'tickets': { 'name': 'Tickets', 'path': '/tickets', 'icon': require('@/assets/images/tickets-icon.svg') },
                'whitelabels': { 'name': 'Whitelable', 'path': '/whitelable', 'icon': require('@/assets/images/operator-icon.svg') },
		        'agents': { 'name': 'Agent', 'path': '/agents', 'icon': require('@/assets/images/operator-icon.svg') }
            },
            menu: {
                1: ['dashboard', 'chatflow', 'operators', 'tickets'],
                2: ['dashboard', 'chatflow', 'whitelables', 'tickets'],
                3: ['dashboard', 'chatflow', 'agents', 'tickets'],
                4: ['dashboard', 'chatrequest', 'autosuggestions', 'tickets'],
            }
        }
    },
    created() {
        if(!this.authData) {
            this.$store.commit('setAuthUser', JSON.parse(localStorage.getItem('authData')))
        }
    },
    
}
</script>
