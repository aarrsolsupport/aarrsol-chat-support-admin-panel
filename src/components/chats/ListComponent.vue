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
                                        <h2>Open Chats<div v-if="unread_count[1]"> ({{ unread_count[1] }})</div>
                                        </h2>
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
                                        <h2>Closed Chats<div v-if="unread_count[2]"> ({{ unread_count[2] }})</div>
                                        </h2>
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
                                        <div v-for="(item, index) in filteredItems" :key="index" class="chat-user-item"
                                            :class="(current_chat.chat_room_id == item.chat_room_id) ? 'user-item-active' : ''"
                                            @click="getChatsMessages(item)">
                                            <button class="chat-user-btn user-active">
                                                <div class="thm-heading">
                                                    <h2>{{ item.end_user_name }}</h2>
                                                    <div class="dots">
                                                        <span class="dots-btn"></span>
                                                        <div class="user-active-con">
                                                            <div class="thm-heading">
                                                                <p>Active *TO-DO*</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dots" v-if="item.unread_message_count > 0">
                                                    <div class="user-status-active dots-btn">
                                                        <span> {{ item.unread_message_count }}</span>
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
                <template v-else>
                    <div class="chat-heading">
                        <div class="thm-heading">
                            <h2>My Chats<div v-if="unread_count[0]"> ({{ unread_count[0] }})</div>
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
                                <div v-for="(item, index) in filteredItems" :key="index" class="chat-user-item"
                                    @click="getChatsMessages(item)">
                                    <button class="chat-user-btn user-active">
                                        <div class="thm-heading">
                                            <h2> {{ item.end_user_name }}</h2>
                                            <div class="dots">
                                                <span class="dots-btn"></span>
                                                <div class="user-active-con">
                                                    <div class="thm-heading">
                                                        <p>Active *TO-DO*</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dots" v-if="item.unread_message_count > 0">
                                            <div class="user-status-active dots-btn">
                                                <span> {{ item.unread_message_count }}</span>
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
            <div v-if="current_chat.chat_room_id" class="borad-inner-body-con w-100 messag-fix-sec agent-chat-sec" :class="showChat && current_chat.length ? 'show' : ''">
                <div class="operator-table-sec chat-flow-tables ">
                    <div class="messages-item-sec">
                        <div class="user-active-heading">
                            <div class="messages-item-header">
                                <button class="back-arrow" @click="showChat = 0">
                                    <img src="@/assets/images/back-arrow.svg" alt="">
                                </button>
                                <div class="thm-heading">
                                    <h4>{{ current_chat.end_user_name }}</h4>
                                    <span>Online *TO-DO*</span>
                                </div>
                            </div>
                            <div class="Categories-btn">
                                <template v-if="authData.role_id == 4">
                                    <button class="thm-btn danger-thm" v-if="current_chat.status == 1">End Chat </button>
                                    <button class="thm-btn thm-border-btn blue-bg" data-bs-toggle="offcanvas"
                                        data-bs-target="#addticketoffcanvas" aria-controls="operatoroffcanvas">Add
                                        Ticket</button>
                                </template>
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
                                <div class="messages-item" v-for="(mes, i) in messages" :key="i"
                                    :class="(current_chat.end_user_id == mes.sender_id) ? '' : 'outgoing-messages'">
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
                        <div class="messages-footer-sec" v-if="current_chat.status == 1">
                            <div class="auto-message-slider">
                                <div class="auto-message-slider-con reason-sec">
                                    <!-- <div class="owl-carousel owl-theme" id="auto-message-slider"> -->
                                    <Carousel v-bind="settings" :breakpoints="breakpoints" class="w-100 owl-theme">
                                        <Slide v-for="(slide, i) in filteredSuggestions" :key="i">
                                            <div class="item">
                                                <div class="auto-message-con">
                                                    <a @click="input = slide.description" href="#"
                                                        class="thm-btn thm-border-btn">
                                                        {{ (slide.description.length < 20) ? slide.description :
                                                            slide.description.slice(0, 20) + "..." }} </a>
                                                </div>
                                            </div>
                                        </Slide>
                                        <template #addons>
                                            <Navigation />
                                        </template>
                                    </Carousel>
                                    <!-- </div> -->
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
                                        <input type="text" placeholder="Write something....." v-model="input">
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

    <!--Operator offcanvas-->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="addticketoffcanvas" aria-labelledby="operatoroffcanvasLabel">
        <div class="offcanvas-header operator-offcanvas-sec ">
            <div class="thm-heading">
                <h4>Add Ticket</h4>
            </div>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body operator-offcanvas-body add-messag-body add-now-sec ticket-body">
            <form>
                <div class="operator-offcanvas-con">
                    <div class="operator-item">
                        <label for="operator" class="form-label">Categories</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected="">All</option>
                            <option value="1">How to deposit </option>
                            <option value="2">How to Login </option>
                            <option value="2">How to Register </option>

                        </select>
                    </div>
                    <div class="operator-item">
                        <label for="operator" class="form-label">Message</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            placeholder="Enter Name"></textarea>
                    </div>
                    
                </div>
                <div class="operator-offcanvas-footer">
                    <button class="thm-btn thm-border-btn" data-bs-dismiss="offcanvas" aria-label="Close">Close</button>
                    <button class="thm-btn">Generate</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
</script>
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
                return filtered_data.filter(item => item.end_user_name.toLowerCase().includes(this.search.toLowerCase()));
            }
            return filtered_data;
        },
        filteredSuggestions() {
            const filtered_data = this.suggestions;
            if (this.input) {
                return filtered_data.filter(item => item.description.toLowerCase().includes(this.input.toLowerCase()));
            }
            return filtered_data;
        },
    },
    data() {
        return {
            my_chats: true,
            chat_type: 0,
            unread_count: { 0: 0, 1: 0, 2: 0 },
            search: '',
            suggestions: {},
            listItems: {},
            showChat: 0,
            current_chat: {},
            // carousel settings
            settings: {
                itemsToShow: 1,
                snapAlign: 'center',
            },
            // breakpoints are mobile first
            // any settings not specified will fallback to the carousel settings
            breakpoints: {
                // 700px and up
                700: {
                    itemsToShow: 3.5,
                    snapAlign: 'center',
                },
                // 1024 and up
                1024: {
                    itemsToShow: 5.5,
                    snapAlign: 'start',
                },
            },
            input: ""
        }
    },
    watch: {
        chat_type() {
            this.getChatsList()
        }
    },
    mounted() {
        if (this.authData && this.authData.role_id == 4) {
            this.chat_type = 1
        }
    },
    methods: {
        getChatsMessages(item) {
            this.current_chat = Object.assign({}, item)
            console.log(this.current_chat)
            this.$store.commit('is_loader', true);
            axios.post('chat/get-messages', { room_id: this.current_chat.chat_room_id })
                .then(res => {
                    console.log(['res', res])
                    this.showChat = 1
                    this.messages = Object.assign([], res.data.data.messages)
                    //         // this.unread_count[this.chat_type] = res.data.data.unread_count;
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.$toast.error(e.response.message ?? e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
        },
        getChatsList() {
            this.$store.commit('is_loader', true);
            let body = { type: this.chat_type }
            if (this.authData && this.authData.role_id == 4) {
                body.auto_suggestions = true
            }
            axios.post('/get-chats-list', body)
                .then(res => {
                    this.suggestions = Object.assign([], res.data.data.auto_suggestions)
                    this.listItems = Object.assign([], res.data.data.chats_list)
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