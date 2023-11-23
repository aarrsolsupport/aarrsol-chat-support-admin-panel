<template>
    <header class="header-wrapper" v-if="authData">
       <div class="container-fluid">
          <div class="header-sec">
             <div class="header-logo">
                <a href="#">
                   <img src="@/assets/images/logo-img.svg" alt="">
                </a>
             </div>
             <div class="admin-notification">
                <!-- <div class="notification-sec">
                   <button type="button" class="header-admin-btn">
                      <div class="notification-img">
                         <img src="@/assets/images/chat-icon.svg" alt="">
                      </div>
                   </button>
                </div> -->
                <div class="notification-sec">
                   <button type="button" class="header-admin-btn">
                      <div class="notification-img">
                         <img src="@/assets/images/notification-bing.svg" alt="">
                      </div>
                   </button>
                </div>
                <div class="admin-sec">
                   <div class="admin-con thm-heading">
                      <span>Login With  </span>
                      <h3 class="text-primary">{{ authData.name }}</h3>
                   </div>

                   <div class="admin-img-sec more-action-sec">
                        <button type="button" class="header-admin-btn" data-bs-toggle="dropdown" aria-expanded="true">
                           <div class="admin-img">
                              <img src="@/assets/images/admin-user-icon.svg" alt="">
                           </div>
                        </button>
                           <ul class="dropdown-menu dropdown-menu-end more-action-list" data-popper-placement="bottom-end" style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(-360px, 73px);">
                              <li @click="logout">
                                  <button class="dropdown-item more-list-btn" type="button">
                                  <div class="edit-icon"><img src="@/assets/images/logout-icon.svg" alt=""></div><div class="thm-heading"> <h2>Logout</h2></div> </button>
                              </li>
                          </ul>
                     </div>
                </div>
             </div>
          </div>
       </div>
    </header>
</template>

<script>
   import axios from "axios"
   import { mapState } from 'vuex';
   export default {
      name: 'HeaderComponent',
      computed: {
         ...mapState(['authData']),
      },
      beforeCreate() {
         this.$store.commit('setAuthUser', JSON.parse(localStorage.getItem('authData')))
      },
      created() {
         //window.Echo.disconnect();
         window.Echo.connect();
      },
      methods: {
         logout() {
            this.$store.commit('is_loader', true);
            axios.post('logout').then(res => {
               if(res.data.error === true){  
                  this.$toast.error(res.data.message);
               }else{
                  this.$store.commit('setAuthUser', {})
                  localStorage.removeItem('_token');
                  localStorage.removeItem('authData');
                  this.$router.push('/login')
               }
               this.$store.commit('is_loader', false);
            })
         }
      }
   }
</script>