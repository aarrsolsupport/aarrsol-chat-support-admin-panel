<template>
    <div class="borad-inner-body-sec"
        :class="(authData.role_id == 3) ? 'chat-user-wrapper agent-chat-request' : ''">
        <div class="borad-inner-body">
            <div class="borad-inner-body-con agent-flow-sec w-100">
                <template v-if="(authData.role_id == 3)">
                    <div class="chat-request-offcanvas-con">
                        <div class="thm-heading">
                            <h4>Agent chat Request</h4>
                        </div>
                        <div class="chat-request-btn">
                            <button class="thm-btn" data-bs-toggle="offcanvas" data-bs-target="#userlistffcanvas"
                                aria-controls="operatoroffcanvas"><img src="@/assets/images/chat-request-icon.svg" alt="">
                            </button>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="search-sec">
                        <div class="search-input-sec">
                            <input type="text" placeholder="Search" v-model="search">
                            <div class="search-icon">
                                <img src="@/assets/images/search-icon.svg" alt="">
                            </div>
                        </div>

                        <div class="categories-sec">
                            <div class="operator-item">
                                <label for="operator" class="form-label">Categories</label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected="">All</option>
                                    <option value="1">how to deposit </option>
                                    <option value="2">how to Login </option>
                                    <option value="2">how to Register </option>

                                </select>
                            </div>
                        </div>

                    </div>
                </template>

                <div class="operator-table-sec" :class="(authData.role_id == 3) ? 'chat-flow-tables' : ''">
                    <div class="operator-table-con">
                        <table class="table thm-heading">
                            <thead>
                                <tr>
                                    <th>
                                        <h2> S.No</h2>
                                    </th>
                                    <th>
                                        <h2>User ID</h2>
                                    </th>
                                    <th>
                                        <h2>Issue Name</h2>
                                    </th>
                                    <th>
                                        <h2>Requested At /Action At </h2>
                                    </th>
                                    <th v-if="(authData.role_id == 4)">
                                        <h2 class="text-center">Action</h2>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in chatRequestsList" :key="index">
                                    <td>
                                        <h2>{{ ((pagination_data.current_page - parseInt(1)) * pagination_data.per_page) +
                                            index + parseInt(1) }}</h2>
                                    </td>
                                    <td>
                                        <h2>{{ item.userid }}</h2>
                                    </td>
                                    <td>
                                        <h2>{{ item.issue_name }}</h2>
                                    </td>
                                    <td>
                                        <h2>{{ $filters.messageDateTimeFormat(item.requested_at_timestamp) }}</h2>
                                    </td>
                                    <td v-if="(authData.role_id == 4)">
                                        <div class="Categories-btn">
                                            <button class="thm-btn success-thm"
                                                @click="acceptChatRequests(item, index)">Accept</button>
                                            <button class="thm-btn danger-thm" data-bs-toggle="modal"
                                                data-bs-target="#rejectdetails" v-if="false">Reject</button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div class="operator-table-footer">
                        <PaginationComponent :data="pagination_data"></PaginationComponent>
                    </div>
                </div>
            </div>
            <div class="chat-request-sec chat-request-offcanvas " v-if="(authData.role_id == 3)">
                <div class="thm-heading">
                    <h4>User List</h4>
                </div>
                <div class="chat-user-tab">
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
                                <div v-for="(item, index) in filteredAgents" :key="index" class="chat-user-item user-item-active" @click="openChatWithAgent(item)">
                                    <button class="chat-user-btn user-active">
                                        <div class="thm-heading">
                                            <h2> {{ item.name }}</h2>
                                            <div class="dots">
                                                <span class="dots-btn"></span>
                                                <div class="user-active-con">
                                                    <div class="thm-heading">
                                                        <p>Active *TO-DO*</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dots" v-if="item.open_chats">
                                            <div class="user-status-active dots-btn">
                                                <span>{{ item.open_chats }}</span>
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
            </div>
        </div>
    </div>
    <div class="modal fade" id="rejectdetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered reject-popup-modal">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="status-popup-sec">
                        <div class="status-popup-con">

                            <div class="menu-item-con">
                                <div class="menu-item-img header-admin-btn">
                                    <img src="@/assets/images/reject-icon.svg" alt="">
                                </div>
                                <div class="thm-heading">
                                    <p>Are you sure want to Reject?</p>
                                </div>
                            </div>

                            <div class="operator-item">
                                <label for="operator" class="form-label">Reason*</label>
                                <input type="text" class="form-control " placeholder="Enter Here" aria-autocomplete="list">
                            </div>

                            <div class="reason-sec">
                                <button class="thm-btn thm-border-btn">Not my categories</button>
                                <button class="thm-btn thm-border-btn">I’m Busy</button>
                            </div>


                            <div class="operator-offcanvas-footer pb-0">
                                <button class="thm-btn thm-border-btn grey-bg border-0"
                                    data-bs-dismiss="modal">Back</button>
                                <button class="thm-btn danger-btn">Reject</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";
import PaginationComponent from '../PaginationComponent.vue'
export default {
    name: 'ChatRequestListComponent',
    components: {
        PaginationComponent
    },
    data() {
        return {
            chatRequestsList: null,
            pagination_data: {
                "from": 1,
                "to": 20,
                "total": 20,
                "links": {},
                "current_page": 1,
                "per_page": 20,
            },

            search: '',
            agentListItems: {},

        }
    },
    watch: {
        '$store.state.chat_request': function () {
            let request = this.$store.state.chat_request;
            if (request.ended) {
                // console.log(request.chat_room)
                // If present chat_room in list remove from list
                for (const [key, value] of Object.entries(this.chatRequestsList)) {
                    if (value.id == request.chat_room.id) {
                        this.chatRequestsList.splice(key, 1)
                    }
                }
            } else {
                this.chatRequestsList.unshift(request.chat_room);
                if (this.chatRequestsList.length >= this.pagination_data.per_page)
                    this.chatRequestsList.pop();
            }
        }
    },
    mounted() {
        this.getChatRequests();
        if(this.authData && this.authData.role_id == 3) {
            this.getAgents();
        }
    },
    computed: {
        ...mapState(['authData']),
        filteredAgents() {
            const filtered_data = this.agentListItems;
            if (this.search) {
                return filtered_data.filter(item =>
                (
                    item.name.toLowerCase().includes(this.search.toLowerCase())
                    || item.userid.toLowerCase().includes(this.search.toLowerCase())
                )
                );
            }
            return filtered_data;
        }
    },
    methods: {
        getChatRequests() {
            this.$store.commit('is_loader', true);

            axios.get('/get-chat-requests?page=' + this.pagination_data.current_page + '&per_page=' + this.pagination_data.per_page)
                .then(res => {
                    if (res.status == 200) {
                        this.chatRequestsList = res.data.data.list_items.data;
                        this.pagination_data.total = res.data.data.list_items.total;
                        this.pagination_data.from = res.data.data.list_items.from;
                        this.pagination_data.to = res.data.data.list_items.to;
                        this.pagination_data.links = res.data.data.list_items.links;
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.$toast.error(e.response.message ?? e.response.data.message);
                    this.$store.commit('is_loader', false);
                    console.error(e);
                })
        },
        acceptChatRequests(chat, position) {
            this.$store.commit('is_loader', true);
            axios.post('/accept-chat-request', { room_id: chat.id })
                .then(res => {
                    if (res.status == 200) {
                        window.open('/chats/'+chat.userid, '_blank');
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.$toast.error(e.response.message ?? e.response.data.message);
                    this.$store.commit('is_loader', false);
                    console.error(e);
                })
        },
        getAgents() {
            axios.get('/agents/get-active-agents-list' + '?parentid=' + this.authData.id).then(res => {
                // console.log(res)
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                    this.agentListItems = res.data.data.list_items;
                }
                this.$store.commit('is_loader', false);
            }).catch(e => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            })
        },
        openChatWithAgent(item) {
            window.open('/chats/'+item.userid, '_blank');
        }
    }

}
</script>

<style>
.Categories-btn {
    justify-content: center;
}
</style>