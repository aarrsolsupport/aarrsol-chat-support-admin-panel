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
                           <span class="text-uppercase">{{ attr.replaceAll('_', ' ') }}</span>
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
import { mapState } from "vuex";
import axios from "axios";
   export default {
      name: 'DashboardComponent',
      data() {
         return {
            statistics: []
         }
      },
      watch: {
         '$store.state.chat_request': function () {
            this.statistics.requested_chats++;
         }
      },
      computed: {
         ...mapState(['authData']),
      },
      mounted() {
         this.getStatistics()
         
         let tktchannel = "ticket-status-updated-channel."+this.authData.role_id+"." + this.authData.id;
         console.log(tktchannel);
         window.Echo.channel(tktchannel).listen(".updated-ticket-status", (data) => {
            console.log(['updated-ticket-status',data])
            Object.keys(data).forEach(attr => {
               if(attr.includes('tickets')) {
                  this.statistics[attr] += data[attr];
               }
            });
         });
         
         if(this.authData && [3, 4].includes(this.authData.role_id)) {
            let channel = "requested-chat-accepted-channel." + ((this.authData.role_id == 3) ? this.authData.id : this.authData.parent_id);
            window.Echo.channel(channel).listen(".agent-joined-chat", (data) => {
               this.statistics.requested_chats--;
               if(this.authData.role_id == 4 && data.agent_id == this.authData.id) {
                  this.statistics.open_chats++;
               }
            });
         }
      },
      methods: {
         getRedirectLink(attr) {
            if(attr.includes('agents')) {
               return "/agents";
            } else if(attr.includes('chats')) {
               if(attr == 'requested_chats') {
                  return "/chat-requests";
               }
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