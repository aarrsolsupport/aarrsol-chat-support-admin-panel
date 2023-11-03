<template>
    <div class="borad-inner-body-sec chat-user-wrapper  agent-chat-user">
        <div class="borad-inner-body">
            <div class="chat-user-tab ">
                <template v-if="authData.role_id == 4">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation" @click="chat_type = 1">
                            <button class="nav-link active" id="pills-open-chat-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-open-chat" type="button" role="tab" aria-controls="pills-open-chat"
                                aria-selected="true">
                                <div class="chat-heading">
                                    <div class="thm-heading">
                                        <h2>Open Chats<div v-if="unread_count[1]"> ({{ unread_count[1] }})</div></h2>
                                    </div>
                                </div>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation" @click="chat_type = 2">
                            <button class="nav-link" id="pills-close-chat-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-close-chat" type="button" role="tab" aria-controls="pills-close-chat"
                                aria-selected="false" tabindex="-1">
                                <div class="chat-heading">
                                    <div class="thm-heading">
                                        <h2>Closed Chats<div v-if="unread_count[2]"> ({{ unread_count[2] }})</div></h2>
                                    </div>
                                </div>
                            </button>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <!-- tab-pane fade show active -->
                        <div class="" :id="chat_type == 1 ? 'pills-open-chat' : 'pills-close-chat'" role="tabpanel"
                            aria-labelledby="pills-open-chat-tab">
                            <div class="chat-user-body">
                                <div class="search-sec p-0 border-0 justify-content-center">
                                    <div class="search-input-sec">
                                        <input type="text" placeholder="Search" v-model="search">
                                        <div class="search-icon">
                                            <img src="@/assets/images/search-icon.svg" alt="">
                                        </div>
                                    </div>
                                </div>
                                <div class="chat-user-sec">
                                    <div class="chat-user-tab-sec">
                                        <div v-for="(item,index) in filteredItems" :key="index" class="chat-user-item" @click="getChatsMessages(item)">
                                            <button class="chat-user-btn user-active">
                                                <div class="thm-heading">
                                                    <h2> {{item.end_user_name}}</h2>
                                                    <div class="dots">
                                                        <span class="dots-btn"></span>
                                                        <div class="user-active-con">
                                                            <div class="thm-heading">
                                                                <p>Active *TO-DO*</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dots" v-if="item.unread_message_count>0">
                                                    <div class="user-status-active dots-btn">
                                                        <span> {{item.unread_message_count}}</span>
                                                    </div>
                                                    <div class="user-active-con">
                                                        <div class="thm-heading">
                                                            <p>Open Chat</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- SCROLL PAGINATION *TO-DO* -->
                    </div>
                </template>
                <template>
                    <div class="chat-heading">
                        <div class="thm-heading">
                            <h2>Chats<div v-if="unread_count[0]"> ({{ unread_count[0] }})</div>
                            </h2>
                        </div>
                    </div>
                    <div class="chat-user-body">
                        <div class="search-sec p-0 border-0 justify-content-center">
                            <div class="search-input-sec">
                                <input type="text" placeholder="Search" v-model="search">
                                <div class="search-icon">
                                    <img src="@/assets/images/search-icon.svg" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="chat-user-sec">
                            <div class="chat-user-tab-sec">
                                <div class="chat-user-item" @click="openHide()">
                                    <button class="chat-user-btn user-active">
                                        <div class="thm-heading">
                                            <h2> Ayushmaster177</h2>
                                            <div class="dots">
                                                <span class="dots-btn"></span>
                                                <div class="user-active-con">
                                                    <div class="thm-heading">
                                                        <p>Active</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dots">
                                            <div class="user-status-active dots-btn">
                                                <span>2</span>
                                            </div>
                                            <div class="user-active-con">
                                                <div class="thm-heading">
                                                    <p>Open Chat</p>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div class="chat-user-item user-item-active" @click="openHide()">
                                    <button class="chat-user-btn user-active">
                                        <div class="thm-heading">
                                            <h2> Designerhari</h2>
                                            <div class="dots">
                                                <span class="dots-btn"></span>
                                                <div class="user-active-con">
                                                    <div class="thm-heading">
                                                        <p>Active</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dots">
                                            <div class="user-status-active dots-btn">
                                                <span>2</span>
                                            </div>
                                            <div class="user-active-con">
                                                <div class="thm-heading">
                                                    <p>Open Chat</p>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div class="chat-user-item" @click="openHide()">
                                    <button class="chat-user-btn ">
                                        <div class="thm-heading">
                                            <h2> Uidesigner</h2>
                                            <div class="dots">
                                                <span class="dots-btn"></span>
                                                <div class="user-active-con">
                                                    <div class="thm-heading">
                                                        <p>Inactive</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dots">
                                            <div class="user-status-active dots-btn">
                                                <span>2</span>
                                            </div>
                                            <div class="user-active-con">
                                                <div class="thm-heading">
                                                    <p>Open Chat</p>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="borad-inner-body-con w-100 messag-fix-sec agent-chat-sec" :class="showChat ? 'show' : ''">
                <div class="operator-table-sec chat-flow-tables ">
                    <div class="messages-item-sec">
                        <div class="user-active-heading">
                            <div class="messages-item-header">
                                <button class="back-arrow" @click="showChat = 0">
                                    <img src="@/assets/images/back-arrow.svg" alt="">
                                </button>
                                <div class="thm-heading">
                                    <h4>Designerhari</h4>
                                    <span>Online</span>
                                </div>
                            </div>
                            <div class="Categories-btn">
                                <button class="thm-btn danger-thm">End Chat </button>
                                <button class="thm-btn thm-border-btn blue-bg" data-bs-toggle="offcanvas"
                                    data-bs-target="#addticketoffcanvas" aria-controls="operatoroffcanvas">Add
                                    Ticket</button>


                                <div class="more-action-sec">
                                    <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                            src="@/assets/images/more-action.svg" alt=""></button>
                                    <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                        <li>
                                            <button class="dropdown-item more-list-btn" type="button">
                                                <div class="edit-icon"><img src="@/assets/images/delete-icon.svg" alt="">
                                                </div>
                                                <div class="thm-heading">
                                                    <h2>delete chat </h2>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                        <div class="messages-body-sec">
                            <div class="messages-list-sec">

                                <div class="messages-item">
                                    <div class="messages-item-con">
                                        <div class="sub-messages-con thm-heading">
                                            <span class="message-time">12/06/2023 06:28 PM</span>
                                        </div>
                                        <div class="messages-item-content thm-heading">
                                            <p>Hi,Welcome to Clicket support</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="messages-item outgoing-messages">
                                    <div class="messages-item-con">
                                        <div class="sub-messages-con thm-heading">
                                            <span class="message-time">12/06/2023 06:28 PM</span>
                                        </div>
                                        <div class="messages-item-content thm-heading">
                                            <p>There is Issue With Deposit.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="messages-item ">
                                    <div class="messages-item-con">
                                        <div class="sub-messages-con thm-heading">
                                            <span class="message-time">12/06/2023 06:28 PM</span>
                                        </div>
                                        <div class="messages-item-content thm-heading">
                                            <p>Watch this video</p>
                                        </div>
                                        <div class="video-sec">
                                            <iframe width="420" height="240"
                                                src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
                                        </div>
                                    </div>
                                </div>

                                <div class="messages-item outgoing-messages">
                                    <div class="messages-item-con">
                                        <div class="sub-messages-con thm-heading">
                                            <span class="message-time">12/06/2023 06:28 PM</span>
                                        </div>
                                        <div class="messages-item-content thm-heading">
                                            <p>How to Deposit</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="messages-item ">
                                    <div class="messages-item-con">
                                        <div class="sub-messages-con thm-heading">
                                            <span class="message-time">12/06/2023 06:28 PM</span>
                                        </div>
                                        <div class="messages-item-content thm-heading">
                                            <p>Reference site about Lorem Ipsum, giving information on its origins, as well
                                                as <br>
                                                a random Lipsum generator.</p>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                        <div class="messages-footer-sec">
                            <div class="auto-message-slider">
                                <div class="auto-message-slider-con reason-sec">
                                    <div class="owl-carousel owl-theme" id="auto-message-slider">
                                        <div class="item">
                                            <div class="auto-message-con"><a href="#"
                                                    class="thm-btn thm-border-btn">Welcome</a></div>
                                        </div>
                                        <div class="item">
                                            <div class="auto-message-con"> <a href="#" class="thm-btn thm-border-btn">Hello!
                                                    How May i help you</a></div>
                                        </div>
                                        <div class="item">
                                            <div class="auto-message-con"><a href="#" class="thm-btn thm-border-btn">Thank
                                                    You!</a></div>
                                        </div>
                                        <div class="item">
                                            <div class="auto-message-con"><a href="#"
                                                    class="thm-btn thm-border-btn">Welcome</a></div>
                                        </div>
                                        <div class="item">
                                            <div class="auto-message-con"> <a href="#" class="thm-btn thm-border-btn">Hello!
                                                    How May i help you</a></div>
                                        </div>
                                        <div class="item">
                                            <div class="auto-message-con"><a href="#" class="thm-btn thm-border-btn">Thank
                                                    You!</a></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="messages-footer-con pt-0">
                                <div class="messages-input">
                                    <button type="button" class="header-admin-btn">
                                        <div class="admin-img">
                                            <img src="@/assets/images/emoji-icon.svg" alt="">
                                        </div>
                                    </button>
                                    <div class="messages-type-input">
                                        <input type="text" placeholder="Write something.....">
                                    </div>
                                    <div class="messages-type-right">
                                        <button type="button" class="header-admin-btn">
                                            <div class="admin-img">
                                                <img src="@/assets/images/circle-microphone.svg" alt="">
                                            </div>
                                        </button>
                                        <button type="button" class="header-admin-btn">
                                            <div class="admin-img">
                                                <img src="@/assets/images/images-pin-icon.svg" alt="">
                                            </div>
                                        </button>
                                        <div class="send-btn-sec">
                                            <button class="thm-btn">Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
   import { mapState } from 'vuex';
    export default {
        name: 'ListComponent',
        computed: {
            ...mapState(['authData']),
            filteredItems() { 
                const filtered_data = this.listItems;
                if (this.search) {
                    return filtered_data.filter(item => item.end_user_name.toLowerCase().includes(this.search.toLowerCase())  );
                }
                return filtered_data;
            }
        },
        data() {
            return {
                my_chats: true,
                chat_type: 0,
                unread_count: {0:0, 1:0, 2:0},
                search: '',
                listItems: {},
                showChat: 0,
                current_chat: {}
            }
        },
        watch: {
            chat_type(){
                this.getChatsList()
            }
        },
        mounted() {
            if(this.authData && this.authData.role_id == 4 ) {
                this.chat_type = 1
            }
        },
        methods: {
            getChatsMessages(item) {
                this.current_chat = Object.assign({}, item)
                console.log(this.current_chat)
                // this.$store.commit('is_loader', true);
                // axios.post('/get-chat-messages', { room_id: this.current_chat.id })
                //     .then(res => {
                //         this.showChat = 1
                //         // this.listItems = Object.assign([],res.data.data.chats_list)
                //         // this.unread_count[this.chat_type] = res.data.data.unread_count;
                //         this.$store.commit('is_loader', false);
                //     }).catch(e => {
                //         this.$toast.error(e.response.message ?? e.response.data.message);
                //         this.$store.commit('is_loader', false);
                //     })
            },
            getChatsList() {
                this.$store.commit('is_loader', true);
                axios.post('/get-chats-list', { type: this.chat_type })
                    .then(res => {
                        this.listItems = Object.assign([],res.data.data.chats_list)
                        this.unread_count[this.chat_type] = res.data.data.unread_count;
                        this.$store.commit('is_loader', false);
                    }).catch(e => {
                        this.$toast.error(e.response.message ?? e.response.data.message);
                        this.$store.commit('is_loader', false);
                    })
            }
        }   
    }
</script>