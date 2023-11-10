<template>
    <div class="messages-body-sec">
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
                        <iframe width="420" height="240"
                            src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="messages-footer-sec" v-if="agent_id != 0">
        <div class="messages-footer-con pt-0">
            <div class="messages-input">
                <!-- <button type="button" class="header-admin-btn">
                    <div class="admin-img">
                        <EmojiPicker :native="true" @select="onSelectEmoji" v-if="showEmoji" />
                        <img class="emoji-icon" src="@/assets/images/emoji-icon.svg" alt=""
                            @click="toggleEmojiPicker()">
                    </div>
                </button> -->
                <div class="messages-type-input">
                    <input type="text" placeholder="Write something....." v-model="input">
                </div>
                <div class="messages-type-right">
                    <!-- <button type="button" class="header-admin-btn" @click="showAudio()">
                        <div class="admin-img">
                            <img src="@/assets/images/circle-microphone.svg" alt="">
                        </div>
                    </button> -->
                    <button type="button" class="header-admin-btn">
                        <div class="admin-img">
                            <img src="@/assets/images/images-pin-icon.svg" alt="">
                        </div>
                    </button>
                    <div class="send-btn-sec">
                        <button class="thm-btn" @click="sendMessage">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
   export default {
      name: 'EndUserChatComponent',
      data() {
         return {
            messages: [],
            room_id: 3,
            agent_id: 42,
            end_user_id: 1,
            input: ""
         }
      },
      mounted() {
        window.Echo.connect();
        console.log("message-channel."+this.room_id)
        window.Echo.channel("message-channel."+this.room_id).listen(".receive-messages", (data) => {
            this.messages.push(data)
        });
      },
      methods: {
        sendMessage() {
            axios.post('/chat/send-message', { chat_room_id: this.room_id, sender_type: 1, sender_id: this.end_user_id, message: this.input })
            .then(res => {
                console.log(res)
            }).catch(e => {
                console.error(e);
            })
        }
      }
   }
</script>