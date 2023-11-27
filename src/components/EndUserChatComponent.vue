<template>
    <div class="modal-dialog  thm-chat-modal-sec">
        <div class="modal-content">

            <div class="modal-header" :style="{ 'background-color': headerColor }">
                <div class="chat-header-sec">
                    <div class="back-btn-sec">
                        <button>
                            <img class="chat-back-arrow" src="@/assets/images/back-arrow.svg" alt="">
                        </button>
                    </div>
                    <div class="chat-heading">
                        <h2 class="text-capitalize">{{ domainName }} Assistant</h2>
                    </div>
                </div>
                <button type="button" class="btn-close" @click="cloaseChatModal()"></button>
            </div>
            <div class="modal-body chat-modal-body">
                <section class="chatbot-wrapper" style="height: 100vh;">
                    <!-- ADD USER -->
                    <div class="messages-container" v-if="chatComponent == 'add_user'">
                        <div class="messages-list-sec">

                            <div class="messages-item">
                                <div class="messages-item-con">
                                    <div class="assistant-input">
                                        <label for="nameinput" class="form-label">User Name</label>
                                        <div class="assistant-input-sec">
                                            <input type="text" class="form-control" id="nameinput" placeholder="Enter Name"
                                                v-model="userName">
                                            <button type="submit" class="thm-btn"
                                                @click="callForAddUserid()">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                    <!-- CHAT LIST -->
                    <div class="messages-container" v-if="chatComponent == 'chat_list'">
                        <div class="messages-list-sec pb-3">

                            <div class="messages-item" v-if="startNewChat">
                                <button type="button" class="messages-item-user start-chat"
                                    @click="callForCreateChatRoom()">
                                    <div class="user-details messages-item-content bg-transparent mt-0">
                                        <p>Start a new chat</p>
                                    </div>
                                    <div class="chat-icon">
                                        <img src="@/assets/images/start-chat-icon.svg" alt="">
                                    </div>
                                </button>
                            </div>

                            <div class="messages-item" v-for="(chat, c_index) in chatList" :key="c_index">
                                <button type="button" class="messages-item-user" :class="{ active: chat.status != 2 }" @click="getChatMessages(chat)">
                                    <div class="user-img">
                                        <img src="@/assets/images/user-img1.png" alt="">
                                    </div>
                                    <div class="user-details chat-heading">
                                        <h2>{{ chat.agent_name || '-' }}</h2>
                                        <div class="sub-messages-con">
                                            <span class="message-time ms-0">{{
                                                $filters.messageDateTimeFormat(chat.last_message_timestamp) }}</span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- MAIN CHAT SECTION -->
                    <div class="messages-container" v-if="chatComponent == 'lang' || chatComponent == 'opt' || chatComponent == 'live_agent'">
                        <div class="messages-list-sec">
                            <div v-html="html" v-for="(html, index) in messagesList" :key="index"></div>
                            <div class="messages-item outgoing-messages">
                                <div class="season-message-tab">
                                    <ul>
                                        <li v-for="(item, i_value, index) in nextActionData" :key="index">
                                            <button type="button" class="thm-btn"
                                                @click="callForSelectLanguageAndOptions(i_value, item)">
                                                {{ item }}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="messages-type-wrapper" v-if="chatTextBox">
                    <div class="messages-type-sec">
                        <div class="messages-type-con">
                            <div class="messages-type-input">
                                <div class="voice-btn-sec gallery-btn-sec">
                                    <input type="file">
                                    <img src="@/assets/images/gallery-icon.svg" alt="">
                                </div>
                                <input type="text" placeholder="Type your message here!" v-model="input">
                                <div class="voice-btn-sec">
                                    <button class="voice-btn" data-bs-toggle="modal" data-bs-target="#voiceModal"><img
                                            src="@/assets/images/voice-icon.svg" alt=""></button>
                                </div>
                            </div>
                            <div class="messages-type-btn-sec">
                                <button class="messages-type-btn" @click="sendMessage"><img
                                        src="@/assets/images/send-icon.svg" alt=""></button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>

    <!-- VOICE MESSEGE TODO -->

    <!-- <div class="modal fade" id="voiceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog open-modal-sec   voice-modal-sec">
         <div class="modal-content">
            <div class="modal-header">
               <div class="voice-heading">
                  <h3>Chat with voice</h3>
               </div>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

               <div class="voice-heading text-center sub-messages-con">
                  <span>Hi I am Listening. Try saying</span>
                  <h2>Live Casino</h2>
               </div>
               <button class="voice-bar-btn">
                  <div class="voice-bar-sec">
                     <div class="bars-con">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                     </div>
                  </div>
               </button>

            </div>
            <div class="previous-restart-sec">
               <button class="thm-btn m-auto bg-transparent" data-bs-toggle="modal"
                  data-bs-target="#micModal">Next</button>
            </div>

         </div>
      </div>
   </div> -->

    <!-- <div class="modal fade" id="micModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog open-modal-sec  thm-modal-sec voice-modal-sec">
         <div class="modal-content">
            <div class="modal-header">
               <div class="voice-heading">
                  <h3>Chat with voice</h3>
               </div>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

               <div class="voice-heading text-center mic-heading">
                  <h2>Didn't hear that. Try again.</h2>
               </div>

               <div class="chat-voice-sec">
                  <button class="thm-btn" type="button">Live Casino</button>
                  <button class="thm-btn" type="button">Game</button>
                  <button class="thm-btn" type="button">Teen Patti</button>
               </div>

               <button class="voice-bar-btn">
                  <div class="voice-bar-sec voice-mic-sec">
                     <img src="assets/images/mic-icon.svg" alt="">
                  </div>
               </button>
               <div class="sub-messages-con text-center mt-3">
                  <span>Top microphone to try again.</span>
               </div>
            </div>
         </div>
      </div>
   </div> -->
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
    name: 'EndUserChatComponent',
    data() {
        return {
            messages: [],
            agent_id: null,
            end_user_id: 1,
            input: "",
            domainName: null,
            headerColor: null,
            refId: '',
            userId: null,
            userName: null,
            chat_id: '',
            chatComponent: null,
            chatTextBox: false,
            userIp: null,
            nextActionData: null,
            roomId: null,
            messagesList: [],
            chatList: null,
            startNewChat: false,
            chatFlow : 1
        }
    },
    mounted() {
        this.refId = this.$route.params.ref_id;
        this.userName = this.$route.params.user_id;
        this.userIp = this.$route.params.user_ip;
        this.getChatWindow()
    },
    methods: {
        startSocketBrodcast() {
            window.Echo.connect();
            window.Echo.channel("message-channel." + this.roomId).listen(".receive-messages", (data) => {
                let outgoingClass = data.sender_type == 1 ? 'outgoing-messages' : '';
                let html = `<div class="messages-item ${outgoingClass}">
                                <div class="messages-item-con">
                                    <div class="sub-messages-con">
                                        <span class="message-time">${this.$filters.messageDateTimeFormat(data.sent_at_timestamp)}</span>
                                    </div>
                                    <div class="messages-item-content">
                                        <p>${data.message}</p>
                                    </div>
                                </div>
                            </div>`
                this.messagesList.push(html)
                
                this.nextActionData = data.next.data;
                if(this.chatFlow == 1 && data.sender_type == 2) {
                    this.chatFlow = 2;
                    this.agent_id = data.sender_id
                }
                if(this.chatComponent != 'live_agent') {
                    this.chatComponent = data.next.next_action;
                }
                if(this.chatComponent == 'live_agent' && data.sender_type == 2) {
                    this.chatTextBox = true
                }
                if(this.nextActionData == 'end') {
                    this.chatTextBox = false
                }
                // console.log(data);
            });
        },
        sendMessage() {
            axios.post('/chat-support/send-message', { room_id: this.roomId, user_id: this.userId, message: this.input })
                .then(res => {
                    this.input = '';
                    // console.log(res)
                }).catch(e => {
                    console.error(e);
                })
        },
        getChatWindow() {
            this.$store.commit('is_loader', true);
            const requestData = {
                ref_id: this.refId,
                ip_address: this.userIp
            };
            this.userName ? requestData.user_id = this.userName : ''

            axios.post('/chat-support/get-data', requestData)
                .then(res => {
                    if (res.status == 200) {
                        this.domainName = res.data.data.white_lable_details.website_id;
                        this.headerColor = res.data.data.settings.header_color;
                        this.chatComponent = res.data.data.component;
                        this.userId = res.data.data.end_user_id;
                        this.chatList = res.data.data.chats;
                        if(!res.data.data.open_chats) {
                            this.startNewChat = true;
                        }
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    console.error(e);
                    this.$store.commit('is_loader', false);
                })
        },
        getChatMessages(data) {
            axios.post('/chat-support/get-chat-messages', { ref_id: this.refId, user_id: this.userName, chat_id: data.chat_id })
                .then(res => {
                    let data = res.data.data.messages;
                    for (let i = 0; i < data.length; i++) {
                        let outgoingClass = data[i].sender_type == 1 ? 'outgoing-messages' : '';
                        let html = `<div class="messages-item ${outgoingClass}">
                                <div class="messages-item-con">
                                    <div class="sub-messages-con">
                                        <span class="message-time">${this.$filters.messageDateTimeFormat(data[i].sent_at_timestamp)}</span>
                                    </div>
                                    <div class="messages-item-content">
                                        <p>${data[i].message}</p>
                                    </div>
                                </div>
                            </div>`
                        this.messagesList.unshift(html)
                    }
                    this.chatComponent = 'live_agent'
                    this.userId = res.data.data.end_user_id;
                    this.roomId = res.data.data.chat_room_id;
                    if(res.data.data.status != 2 && res.data.data.agent_id) {
                        this.chatFlow = 2;
                        this.chatTextBox = true;
                    }
                    this.startSocketBrodcast();
                }).catch(e => {
                    console.error(e);
                })
        },
        callForAddUserid() {
            axios.post('/chat-support/add-userid', { ref_id: this.refId, user_id: this.userName, ip_address: this.userIp })
                .then(res => {
                    this.chatComponent = res.data.data.next_action.next_action;
                    this.nextActionData = res.data.data.next_action.data;
                    this.roomId = res.data.data.next_action.room_id;
                    this.userId = res.data.data.user_id
                    this.optionOrLanguage();
                    this.startSocketBrodcast();
                }).catch(e => {
                    console.error(e);
                })
        },
        cloaseChatModal() {
            window.parent.postMessage('closeChatModal', '*');
        },
        callForSelectLanguageAndOptions(typeId, lang) {
           
            let data = {
                room_id: this.roomId,
                type: this.chatComponent,
                type_id: typeId,
                user_id: this.userId
            }

            axios.post('/chat-support/send-selected-option', data)
                .then(res => {

                }).catch(e => {
                    console.error(e);
                })
        },
        callForCreateChatRoom() {
            axios.post('/chat-support/start-new-chat', { user_id: this.userId })
                .then(res => {
                    this.chatComponent = res.data.data.next_action;
                    this.nextActionData = res.data.data.data;
                    this.roomId = res.data.data.room_id;
                    this.optionOrLanguage();
                    this.startSocketBrodcast();
                }).catch(e => {
                    console.error(e);
                })
        },
        optionOrLanguage() {
            if (this.chatComponent == 'lang') {
                let lang = `<div class="messages-item">
                                    <div class="messages-item-con">
                                        <div class="sub-messages-con">
                                            <span class="message-time">${this.getDateTIme()}</span>
                                        </div>
                                        <div class="messages-item-content">
                                            <p>Choose your language from the list below</p>
                                        </div>
                                    </div>
                                </div>`
                this.messagesList.push(lang)
            }
            if (this.chatComponent == 'opt') {
                let opt = `<div class="messages-item">
                                    <div class="messages-item-con">
                                        <div class="sub-messages-con">
                                            <span class="message-time">${this.getDateTIme()}</span>
                                        </div>
                                        <div class="messages-item-content">
                                            <p>Choose an issue from below</p>
                                        </div>
                                    </div>
                                </div>`;
                this.messagesList.push(opt)
            }
        },
        getDateTIme() {
            return moment(new Date()).format('DD/MM/YYYY hh:mm A');
        }
    }
}
</script>

<style>
#app {
    margin-top: 0px !important;
}


.chat-modal-body {
    padding: 0px !important;
}

.modal-header {
    padding: 1rem 1rem;
}
</style>