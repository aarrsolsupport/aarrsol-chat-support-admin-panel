<template>
    <div class="modal-dialog  thm-chat-modal-sec">
        <div class="modal-content">

            <div class="modal-header" :style="{ 'background-color': headerColor }">
                <div class="chat-header-sec">
                    <div class="back-btn-sec" v-if="chatComponent != 'add_user' && chatComponent != 'chat_list'">
                        <button @click="backToChatList()">
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
                    <div class="messages-container" v-if="chatComponent === 'add_user'">
                        <div class="messages-list-sec">
                            <div class="messages-item">
                                <div class="messages-item-con">
                                    <div class="assistant-input">
                                        <label for="nameinput" class="form-label">User Name</label>
                                        <div class="assistant-input-sec">
                                            <input type="text" class="form-control" id="nameinput" placeholder="Enter Name" v-model="userName">
                                            <button type="submit" class="thm-btn" @click="callForAddUserid()">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- CHAT LIST -->
                    <div class="messages-container" v-else-if="chatComponent === 'chat_list'">
                        <div class="messages-list-sec pb-3">
                            <div class="messages-item" v-if="startNewChat">
                                <button type="button" class="messages-item-user start-chat" @click="callForCreateChatRoom()">
                                    <div class="user-details messages-item-content bg-transparent mt-0">
                                        <p>Start a new chat</p>
                                    </div>
                                    <div class="chat-icon">
                                        <img src="@/assets/images/start-chat-icon.svg" alt="">
                                    </div>
                                </button>
                            </div>
                            <div class="messages-item" v-for="(chat, c_index) in chatList" :key="c_index">
                                <button type="button" class="messages-item-user" :class="{ active: chat.status !== 2 }" @click="getChatMessages(chat)">
                                    <div class="user-img">
                                        <img src="@/assets/images/user-img1.png" alt="">
                                    </div>
                                    <div class="user-details chat-heading">
                                        <h2>{{ chat.agent_name || '-' }}</h2>
                                        <div class="sub-messages-con">
                                            <span class="message-time ms-0">{{ $filters.messageDateTimeFormat(chat.last_message_timestamp) }}</span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- MAIN CHAT SECTION -->
                    <div class="messages-container" v-else>
                        <div class="messages-list-sec" ref="messagesListSec">
                            <div v-html="html" v-for="(html, index) in messagesList" :key="index"></div>
                            <div class="messages-item outgoing-messages">
                                <div class="season-message-tab">
                                    <ul>
                                        <li v-for="(item, i_value, index) in nextActionData" :key="index">
                                            <button type="button" class="thm-btn" @click="callForSelectLanguageAndOptions(i_value, item)">
                                                {{ item }}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- <div class="messages-item outgoing-messages">
                                <div class="img-preview">
                                    <img :src="media" alt="" v-for="media in mediaPreviewBlobs" :key="media.id">
                                </div>
                            </div> -->
                            <div class="messages-item outgoing-messages" v-if="audioPreview">
                                <audio id="recordedAudio"></audio>
                            </div>
                        </div>
                        <div class="messages-item end-message-sec" v-if="chatStatus != 1">
                            <div class="messages-item-con">
                                <div v-if="chatStatus == 0" class="sub-messages-con chat-ended-message display-event-message">
                                    <span class="message-time">Waiting for an agent to join the chat</span><br/>
                                </div>
                                <div v-else-if="chatStatus == 2" class="sub-messages-con chat-ended-message end-message-color">
                                    <span class="message-time">The chat has been ended. </span><br/>
                                    <a href="#" v-if="startNewChat" @click="callForCreateChatRoom(true)">Click here to start a new chat</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="messages-type-wrapper" v-if="chatStatus == 1 && agent_id && chatComponent != 'add_user' && chatComponent != 'chat_list'">
                    <div class="messages-type-sec">
                        <div class="messages-type-con">
                            <div class="messages-type-input">
                                <div class="voice-btn-sec gallery-btn-sec">
                                    <input type="file" name="file" multiple id="file" @change="uplaodImg">
                                    <img src="@/assets/images/gallery-icon.svg" alt="">
                                </div>
                                <input type="text" placeholder="Type your message here!" v-model="input">
                                <div class="voice-btn-sec">
                                    <button class="voice-btn" data-bs-toggle="modal" data-bs-target="#voiceModal" @click="startRecord()"><img
                                            src="@/assets/images/voice-icon.svg" alt="" ></button>
                                </div>
                            </div>
                            <div class="messages-type-btn-sec">
                                <button class="messages-type-btn" @click="sendMessage" @keyup.enter="sendMessage"><img
                                        src="@/assets/images/send-icon.svg" alt=""></button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>

    <!-- VOICE MESSEGE -->

    <div class="modal fade" id="voiceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
               <button class="thm-btn m-auto bg-transparent" @click="stopRecord()" data-bs-dismiss="modal">Next</button>
               <!-- Duplicate -->
               <!-- <button class="thm-btn m-auto bg-transparent" data-bs-toggle="modal"
                  data-bs-target="#micModal" @click="stopRecord()">Next</button> -->
            </div>

         </div>
      </div>
   </div>

    <div class="modal fade" id="micModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                     <img src="@/assets/images/mic-icon.svg" alt="">
                  </div>
               </button>
               <div class="sub-messages-con text-center mt-3">
                  <span>Top microphone to try again.</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
    name: 'EndUserChatComponent',
    data() {
        return {
            refId: '',
            domainName: null,
            headerColor: null,

            userName: null,
            userId: null,

            startNewChat: false,
            chatComponent: null,

            roomId: null,
            chatStatus: null,
            agent_id: null,

            input: "",
            chatList: null,
            nextActionData: null,
            messagesList: [],
            media: null,
            mediaPreviewBlobs: null,
            voiceRecord: {
                rec: '',
                userFile: null,
                userFileName:''
            },
            mediaBaseUrl: process.env.VUE_APP_USER_CHAT_MEDIA,
            audioPreview: false,
            
        }
    },
    mounted() {
        this.refId = this.$route.params.ref_id;
        this.userName = this.$route.params.user_id;
        this.getChatWindow();
    },
    methods: {
        // SOCKET FUNCTION START
        awaitAgentSocket() {
            let channel = "chat-request-accepted-channel." + this.userId;
            window.Echo.channel(channel).listen(".agent-joined-chat", (data) => {
                this.$toast.info(data.agent_name+' has joined the Chat!');
                if(this.roomId == data.chat_room_id) {
                    this.chatStatus = 1;
                    this.agent_id = data.agent_id;
                } else {
                    // *TO-DO* add unread count to chat if in list
                }
            });
        },
        startSocketBrodcast() {
            window.Echo.connect();

            window.Echo.channel("message-channel." + this.roomId).listen(".receive-messages", (data) => {
                if(data.next.status !== undefined){
                    this.chatStatus = data.next.status;
                }
                if (data.sender_type == 2 && this.agent_id != data.sender_id) {
                    this.agent_id = data.sender_id;
                }
                this.nextActionData = data.next.data;
                if (data.next.next_action !== '') {
                    this.chatComponent = data.next.next_action;
                }
                if(data.file_paths) {
                    this.renderMedia(data);
                } 
                if(data.message) {
                    this.renderTextMessage(data);
                } 
                if(this.chatStatus == 1) {
                    this.scrollToBottom();
                }
            });
        },
        // SOCKET FUNCTION END

        // RENDER FUNCTIONS START
        renderMedia(data, getChatMessages = false) {
            const outgoingClass = data.sender_type === 1 ? 'outgoing-messages' : '';
            const filePathsArray = data.file_paths.split('\n');
                filePathsArray.forEach(filePath => {
                    const fileType = filePath.split('.').pop().toLowerCase();
                    if (['png', 'jpg', 'jpeg'].includes(fileType)) {
                        let html = `<div class="messages-item ${outgoingClass}">
                                            <div class="messages-item-con">
                                                <div class="sub-messages-con">
                                                    <span class="message-time">${this.$filters.messageDateTimeFormat(data.sent_at_timestamp)}</span>
                                                </div>
                                                <div class="messages-item-content">
                                                    <img src="${ this.mediaBaseUrl + filePath}" />
                                                </div>
                                            </div>
                                        </div>`;
                        getChatMessages ? this.messagesList.unshift(html) : this.messagesList.push(html);
                    }
                    else {
                        let html = `<div class="messages-item ${outgoingClass}">
                                        <div class="messages-item-con">
                                            <div class="sub-messages-con">
                                                <span class="message-time">${this.$filters.messageDateTimeFormat(data.sent_at_timestamp)}</span>
                                            </div>
                                            <div class="messages-item-content">
                                                <div class="audio-sec">
                                                    <video controls="">
                                                        <source src="${this.mediaBaseUrl + filePath}" />
                                                    </video>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                        getChatMessages ? this.messagesList.unshift(html) : this.messagesList.push(html);
                    }
                })
        },
        renderImageMessage(data) {
            const outgoingClass = data.sender_type === 1 ? 'outgoing-messages' : '';
            const html = `<div class="messages-item ${outgoingClass}">
                                <div class="messages-item-con">
                                    <div class="sub-messages-con">
                                        <span class="message-time">${this.$filters.messageDateTimeFormat(data.sent_at_timestamp)}</span>
                                    </div>
                                    <div class="messages-item-content">
                                        <img src="${ this.mediaBaseUrl + data.file_paths}" />
                                    </div>
                                </div>
                            </div>`;
            this.messagesList.push(html);
        },
        renderTextMessage(data, getChatMessages = false) {
            const outgoingClass = data.sender_type === 1 ? 'outgoing-messages' : '';
            const html = `<div class="messages-item ${outgoingClass}">
                                <div class="messages-item-con">
                                    <div class="sub-messages-con">
                                        <span class="message-time">${this.$filters.messageDateTimeFormat(data.sent_at_timestamp)}</span>
                                    </div>
                                    <div class="messages-item-content">
                                        <p>${data.message}</p>
                                    </div>
                                </div>
                            </div>`;
            getChatMessages ? this.messagesList.unshift(html) : this.messagesList.push(html);
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
        // RENDER FUNCTIONS END

        sendMessage() {
            if (this.input || this.media || this.voiceRecord.userFile) {
                let messageData = new FormData();
                messageData.append('room_id', this.roomId)
                messageData.append('user_id', this.userId)
                messageData.append('message', this.input)

                for (let i = 0; i < this.media?.length; i++) {
                    messageData.append('file[]', this.media[i]);
                }
                this.voiceRecord.userFile ? messageData.append('file[]', this.voiceRecord.userFile) : '';

                axios.post('/chat-support/send-message', messageData)
                    .then(res => {
                        this.input = '';
                        this.audioPreview = false;
                        this.mediaPreviewBlobs = [];
                        this.voiceRecord.userFile = null;
                        this.media = null;
                        // console.log(res)
                    }).catch(e => {
                        console.error(e);
                    })
            } else {
                this.$toast.error('Please type something....');
            }
        },
        getChatWindow() {
            this.$store.commit('is_loader', true);
            const requestData = {
                ref_id: this.refId,
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
                        this.startNewChat = (res.data.data?.open_chats == 0) ? true : false;
                        this.awaitAgentSocket()
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
                    // this.userId = res.data.data.end_user_id;
                    this.roomId = res.data.data.chat_room_id;
                    this.chatStatus = res.data.data.status;
                    this.agent_id = res.data.data.agent_id;
                    
                    const messages = res.data.data.messages;

                    for (let i = 0; i < messages.length; i++) {
                        const message = messages[i];
                        if (message.file_paths) {
                            this.renderMedia(message, true);
                        }
                        if (message.message) {
                            this.renderTextMessage(message, true);
                        }
                    }

                    if (res.data.data.current_options?.data) {
                        this.nextActionData = res.data.data.current_options?.data;
                        this.chatComponent = res.data.data.current_options?.next_action;
                    } else {
                        this.nextActionData = null
                        this.chatComponent = 'live_agent'
                    }

                    if(res.data.data.status == 1) {
                        this.scrollToBottom();
                    }
                    this.startSocketBrodcast();
                }).catch(e => {
                    console.error(e);
                })
        },
        callForAddUserid() {
            const requestData = {
                ref_id: this.refId,
                user_id: this.userName,
            };

            axios.post('/chat-support/add-userid', requestData)
                .then(res => {
                    if (res.status != 200) {
                        this.$toast.error(res.data.message);
                        return
                    } else {
                        const respData = res.data.data;
                        this.chatComponent = respData.next_action.next_action;

                        if (this.chatComponent === 'chat_list') {
                            this.chatList = respData.next_action.data;
                        } else {
                            this.nextActionData = respData.next_action.data;
                        }

                        if (respData.next_action?.open_chats === 0) {
                            this.startNewChat = true;
                        }

                        this.roomId = respData.next_action.room_id;
                        this.userId = respData.user_id;
                        this.optionOrLanguage();
                        this.startSocketBrodcast();
                    }
                })
                .catch(e => {
                    console.error(e);
                    // this.$toast.error(e.data.message);
                });
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
        callForCreateChatRoom(reset = false) {
            this.messagesList = [];
            axios.post('/chat-support/start-new-chat', { user_id: this.userId })
            .then(res => {
                this.agent_id = 0;
                this.chatStatus = 1;
                this.startNewChat = false;
                this.chatComponent = res.data.data.next_action;
                this.nextActionData = res.data.data.data;
                this.roomId = res.data.data.room_id;
                this.optionOrLanguage();
                this.startSocketBrodcast();
            }).catch(e => {
                console.error(e);
            })
        },
        getDateTIme() {
            return moment(new Date()).format('DD/MM/YYYY hh:mm A');
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const messagesListSec = this.$refs.messagesListSec;
                messagesListSec.scrollTop = messagesListSec.scrollHeight + 500;
            });
        },
        backToChatList() {
            this.chatComponent = 'chat_list'; /*GOING BACK TO CHATLIST*/
            this.messagesList = []; /*Emptying Message list so new chat is not appended to existing Message list*/
            this.getChatWindow(); /*REFRESHING CHATLIST DATA TO LATEST ONE*/
            window.Echo.leave("message-channel." + this.roomId) /*DISCONNECTING SOCKET*/
        },
        uplaodImg(event) {
            this.media = [];
            this.mediaPreviewBlobs = [];
            let mediaFiles = event.target.files;
            // console.log(mediaFiles);
            for (let i = 0; i < mediaFiles.length; i++) {
                this.media.push(mediaFiles[i]);
                this.mediaPreviewBlobs.push(URL.createObjectURL(mediaFiles[i]))
            }
        },
        handlerFunction(stream) {
            this.voiceRecord.rec = new MediaRecorder(stream);
            let audioChunks = [];
            this.audioPreview = true
            this.voiceRecord.rec.ondataavailable = (e) => {
                audioChunks.push(e.data);
                if (this.voiceRecord.rec.state == "inactive") {
                    let blob = new Blob(audioChunks, { type: "audio/mp3" });
                    recordedAudio.src = URL.createObjectURL(blob);
                    recordedAudio.controls = true;
                    recordedAudio.autoplay = true;
                    this.sendData(blob);
                }
            };
        },
        sendData(blob) {
            this.voiceRecord.userFile = blob;
            this.voiceRecord.userFileName = "audio-record";
            this.scrollToBottom();
        },
        startRecord() {
            navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
                this.handlerFunction(stream);
                this.voiceRecord.rec.start();
            }).catch((error) => {
                console.error('Error accessing microphone:', error);
            });
        },
        stopRecord() {
            this.voiceRecord.rec.stop();
        },
    },
}
</script>
