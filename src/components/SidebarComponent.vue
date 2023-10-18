<template>
    <div class="sidebar-menu-sec">
        <div class="sidebar-menu-con">
            <div class="sidebar-menu-list">
                <div class="sidebar-menu-item" v-for="(item, index) in menu_items" :key="index" :class="$route.path==item.path ? 'active': ''">
                    <router-link :to="item.path">
                        <div class="menu-item-con">
                            <div class="menu-item-img header-admin-btn">
                                <img :src="item.icon" alt="">
                            </div>
                            <div class="thm-heading">
                                <h2>{{ item.name }}</h2>
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
    data() {
        return {
            menu_items: [
                { 'name': 'Dashboard', 'path': '/', 'icon': require('@/assets/images/dashboard-icon.svg') },
                { 'name': 'Chat Flow', 'path': '/chat-flow', 'icon': require('@/assets/images/chat-flow-icon.svg') },
                { 'name': 'Operators', 'path': '/operators', 'icon': require('@/assets/images/operator-icon.svg') },
                { 'name': 'Tickets', 'path': '/tickets', 'icon': require('@/assets/images/tickets-icon.svg') },
            ],
            authUser:{}
        }
    },
    computed: {
        ...mapState([
            'origin_path'
        ]),
    },
    created(){
        this.authUser =  JSON.parse(localStorage.getItem('authData'));
        if(this.authUser.role_id == 3){
            this.menu_items.push( { 'name': 'Agent', 'path': '/agents', 'icon': require('@/assets/images/operator-icon.svg') })
        }
    }
}
</script>