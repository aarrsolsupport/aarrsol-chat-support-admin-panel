<template>
   <div class="borad-inner-body-sec">
      <div class="borad-inner-body">
         <div class="dashboard-list-sec">
            <div class="row">
               <div class="col-lg-3 col-md-6 col-sm-6" v-for="(val, attr) in statistics" :key="attr">
                  <a :href="getRedirectLink(attr)">
                  <div class="dashboard-list-con" >
                     <div class="dashboard-item">
                        <div class="thm-heading">
                           <h4>{{ val }}</h4>
                           <span class="text-uppercase">{{ attr.replace('_', ' ') }}</span>
                        </div>
                     </div>
                     <div class="ashboard-item-img">
                        <img v-if="attr.includes('tickets')" src="@/assets/images/resolved-tickets-icon.svg" alt="">
                        <img v-else src="@/assets/images/total-operator-icon.svg" alt="">
                     </div>
                  </div></a>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import axios from "axios";
   export default {
      name: 'DashboardComponent',
      data() {
         return {
            statistics: []
         }
      },
      mounted() {
         this.getStatistics()
      },
      methods: {
         getRedirectLink(attr) {
            if(attr.includes('agents')) {
               return "/agents";
            } else if(attr.includes('chats')) {
               return "/chats";
            } else if(attr.includes('operators')) {
               return "/operators";
            } else if(attr.includes('tickets')) {
               return "/tickets";
            } else if(attr.includes('whitelables')) {
               return "/whitelables";
            }
         },
         getStatistics() {
            this.$store.commit('is_loader', true);
            axios.get('/get-stats').then(res => {
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                  this.statistics = res.data.data.stats
                }
                this.$store.commit('is_loader', false);
            }).catch(e => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            })
         }
      }
   }
</script>