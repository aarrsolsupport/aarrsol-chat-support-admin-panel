<template>
    <!-- <div class="messages-body-sec">
        <div class="messages-list-sec">
            <div class="messages-item" v-for="(mes, i) in messages" :key="i"
                :class="(end_user_id == mes.sender_id) ? '' : 'outgoing-messages'">
                <div class="messages-item-con">
                    <div class="sub-messages-con thm-heading">
                        <span class="message-time">{{
                            $filters.messageDateTimeFormat(mes.sent_at_timestamp) }}</span>
                    </div>
                    <div class="messages-item-content thm-heading">
                        <p>{{ mes.message }}</p>
                    </div>
                    <div v-if="mes.file_paths" class="video-sec todo border border-warning">
                        <iframe width="420" height="240" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

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
                    <!-- LANGUAGE -->
                    <div class="messages-container" v-if="chatComponent == 'lang' || chatComponent == 'opt'">
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
                        <!-- <div class="messages-item">
                            <div class="messages-item-con">
                                <div class="sub-messages-con">
                                    <span class="message-time">21-02-2023 06:00 AM </span>
                                </div>
                                <div class="messages-item-content">
                                    <p>Choose your language from the list below</p>
                                </div>
                            </div>
                        </div>


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

                        <div class="messages-item outgoing-messages" v-if="selectedLang">
                                <div class="messages-item-con">
                                    <div class="sub-messages-con">
                                        <span class="message-time">21-02-2023 06:00 AM </span>
                                    </div>
                                    <div class="messages-item-content">
                                        <p>{{ selectedLang }}</p>
                                    </div>
                                </div>
                            </div> -->
                    </div>
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
                    <!-- MAIN CHAT NOT REQ REFRENCE ONLY -->
                    <div class="messages-container" v-if="false">
                        <div class="messages-list-sec">

                            <div class="messages-item">
                                <div class="messages-item-con">
                                    <div class="sub-messages-con">
                                        <span class="message-time">21-02-2023 06:00 AM </span>
                                    </div>
                                    <div class="messages-item-content">
                                        <p>Hi, I’m your personal Victory Assistant</p>
                                    </div>
                                    <div class="messages-item-content">
                                        <p>Choose your language from the list below</p>
                                    </div>
                                </div>
                            </div>

                            <div class="messages-item outgoing-messages d-none">
                                <div class="season-message-tab">
                                    <ul>
                                        <li><button type="button" class="thm-btn">हिन्दी</button> </li>
                                        <li><button type="button" class="thm-btn">English</button></li>
                                        <li><button type="button" class="thm-btn">ગુજરાતી</button></li>
                                        <li><button type="button" class="thm-btn">தமிழ்</button></li>
                                        <li><button type="button" class="thm-btn">पंजाबी</button></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="messages-item outgoing-messages">
                                <div class="messages-item-con">
                                    <div class="sub-messages-con">
                                        <span class="message-time">21-02-2023 06:00 AM </span>
                                    </div>
                                    <div class="messages-item-content">
                                        <p>English</p>
                                    </div>
                                </div>
                            </div>

                            <div class="messages-item">
                                <div class="messages-item-con">
                                    <div class="messages-item-content">
                                        <p>Please Choose an option from below👎</p>
                                    </div>
                                </div>
                            </div>

                            <div class="messages-item outgoing-messages ">
                                <div class="season-message-tab">
                                    <ul>
                                        <li><button type="button" class="thm-btn" data-bs-toggle="modal"
                                                data-bs-target="#morechatmodal">There is a issue with bel slip</button>
                                        </li>
                                        <li><button type="button" class="thm-btn" data-bs-toggle="modal"
                                                data-bs-target="#morechatmodal">Issue with Login</button></li>
                                        <li><button type="button" class="thm-btn" data-bs-toggle="modal"
                                                data-bs-target="#morechatmodal">Issue with Wallet</button></li>
                                        <li><button type="button" class="thm-btn" data-bs-toggle="modal"
                                                data-bs-target="#morechatmodal">Live Chat</button></li>
                                    </ul>
                                </div>
                                <div class="previous-restart-sec">
                                    <button type="button" class="thm-btn">Previous option</button>
                                    <button type="button" class="thm-btn">Restart Chat</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- CHAT LIST -->
                    <div class="messages-container" v-if="chatComponent == 'chat_list'">
                        <div class="messages-list-sec pb-3">

                            <div class="messages-item">
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

                            <div class="messages-item">
                                <button type="button" class="messages-item-user  active">
                                    <div class="user-img">
                                        <img src="@/assets/images/user-img1.png" alt="">
                                    </div>
                                    <div class="user-details chat-heading">
                                        <h2>Designer Hari</h2>
                                        <div class="sub-messages-con">
                                            <span class="message-time ms-0">21-02-2023 06:00 AM </span>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div class="messages-item">
                                <button type="button" class="messages-item-user  ">
                                    <div class="user-img">
                                        <img src="@/assets/images/user-img2.png" alt="">
                                    </div>
                                    <div class="user-details chat-heading">
                                        <h2>Designer Hari</h2>
                                        <div class="sub-messages-con">
                                            <span class="message-time ms-0">21-02-2023 06:00 AM </span>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div class="messages-item">
                                <button type="button" class="messages-item-user  ">
                                    <div class="user-img">
                                        <img src="@/assets/images/user-img3.png" alt="">
                                    </div>
                                    <div class="user-details chat-heading">
                                        <h2>Designer Hari</h2>
                                        <div class="sub-messages-con">
                                            <span class="message-time ms-0">21-02-2023 06:00 AM </span>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div class="messages-item">
                                <button type="button" class="messages-item-user  ">
                                    <div class="user-img">
                                        <img src="@/assets/images/user-img4.png" alt="">
                                    </div>
                                    <div class="user-details chat-heading">
                                        <h2>Designer Hari</h2>
                                        <div class="sub-messages-con">
                                            <span class="message-time ms-0">21-02-2023 06:00 AM </span>
                                        </div>
                                    </div>
                                </button>
                            </div>


                            <div class="messages-item">
                                <button type="button" class="messages-item-user  ">
                                    <div class="user-img">
                                        <img src="@/assets/images/user-img1.png" alt="">
                                    </div>
                                    <div class="user-details chat-heading">
                                        <h2>Designer Hari</h2>
                                        <div class="sub-messages-con">
                                            <span class="message-time ms-0">21-02-2023 06:00 AM </span>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div class="messages-item">
                                <button type="button" class="messages-item-user  ">
                                    <div class="user-img">
                                        <img src="@/assets/images/user-img2.png" alt="">
                                    </div>
                                    <div class="user-details chat-heading">
                                        <h2>Designer Hari</h2>
                                        <div class="sub-messages-con">
                                            <span class="message-time ms-0">21-02-2023 06:00 AM </span>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div class="messages-item">
                                <button type="button" class="messages-item-user  ">
                                    <div class="user-img">
                                        <img src="@/assets/images/user-img3.png" alt="">
                                    </div>
                                    <div class="user-details chat-heading">
                                        <h2>Designer Hari</h2>
                                        <div class="sub-messages-con">
                                            <span class="message-time ms-0">21-02-2023 06:00 AM </span>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div class="messages-item">
                                <button type="button" class="messages-item-user  ">
                                    <div class="user-img">
                                        <img src="@/assets/images/user-img4.png" alt="">
                                    </div>
                                    <div class="user-details chat-heading">
                                        <h2>Designer Hari</h2>
                                        <div class="sub-messages-con">
                                            <span class="message-time ms-0">21-02-2023 06:00 AM </span>
                                        </div>
                                    </div>
                                </button>
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
                                <button class="messages-type-btn" @click="sendMessage"><img src="@/assets/images/send-icon.svg" alt=""></button>
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
            agent_id: 42,
            end_user_id: 1,
            input: "",
            domainName: null,
            headerColor: null,
            refId: '',
            userId: null,
            userName: null,
            chat_id: '',
            chatComponent: null,
            chatTextBox: true,
            userIp: null,
            nextActionData: null,
            roomId: null,
            messagesList: []
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
                if (data.sender_type == 0 || data.sender_type == 2) {
                    let html = `<div class="messages-item">
                                    <div class="messages-item-con">
                                        <div class="sub-messages-con">
                                            <span class="message-time">${this.$filters.messageDateTimeFormat(data.sent_at_timestamp)}</span>
                                        </div>
                                        <div class="messages-item-content">`
                    html += `<p>${data.message}</p>
                                        </div>
                                    </div>
                                </div>`
                    this.messagesList.push(html)
                } else if (data.sender_type == 1) {
                    let html = ` <div class="messages-item outgoing-messages">
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
                }
                // this.messages.push(data)
                console.log(data);
            });
        },
        sendMessage() {
            axios.post('/chat/send-message', { room_id: this.roomId, user_id: this.userId, message: this.input })
                .then(res => {
                    console.log(res)
                }).catch(e => {
                    console.error(e);
                })
        },
        getChatWindow() {
            this.$store.commit('is_loader', true);
            const requestData = {
                ref_id: this.refId,
            };
            this.userName ? requestData.user_id = this.userName : ''

            axios.post('/chat-support/get-data', requestData)
                .then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        this.domainName = res.data.data.white_lable_details.website_id
                        this.headerColor = res.data.data.settings.header_color
                        this.chatComponent = res.data.data.component
                        this.userId = res.data.data.end_user_id
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    console.error(e);
                    this.$store.commit('is_loader', false);
                })
        },
        getChatMessages() {
            axios.post('/chat-support/get-chat-messages', { ref_id: this.refId, user_id: this.userName, chat_id: this.chat_id })
                .then(res => {
                    console.log(res)
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
            window.parent.postMessage('closeModal', '*');
        },
        callForSelectLanguageAndOptions(typeId, lang) {
            if (this.chatComponent == 'lang') {
                let langHtml = ` <div class="messages-item outgoing-messages">
                                    <div class="messages-item-con">
                                        <div class="sub-messages-con">
                                            <span class="message-time">${this.getDateTIme()}</span>
                                        </div>
                                        <div class="messages-item-content">
                                            <p>${lang}</p>
                                        </div>
                                    </div>
                                </div>`
                this.messagesList.push(langHtml);
            }
            let data = {
                room_id: this.roomId,
                type: this.chatComponent,
                type_id: typeId
            }
            this.chatComponent == 'opt' ? data.user_id = this.userId : ''

            axios.post('/chat-support/send-selected-option', data)
                .then(res => {
                    this.chatComponent = res.data.data.next_action;
                    this.nextActionData = res.data.data.data;
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
                    console.log(res)
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