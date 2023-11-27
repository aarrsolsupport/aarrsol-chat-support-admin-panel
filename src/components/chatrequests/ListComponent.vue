<template>
    <div class="borad-inner-body-sec">
        <div class="borad-inner-body">
            <div class="borad-inner-body-con agent-flow-sec">
                <div class="search-sec">
                    <div class="search-input-sec">
                        <input type="text" placeholder="Search">
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
                <div class="operator-table-sec">
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
                                    <th>
                                        <h2 class="text-center">Action</h2>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(chat, c_index) in chatRequestsList" :key="c_index">
                                    <td>
                                        <h2>{{ c_index + 1 }}</h2>
                                    </td>
                                    <td>
                                        <h2>{{ chat.user_id }}</h2>
                                    </td>
                                    <td>
                                        <h2>{{ chat.issue_name }}</h2>
                                    </td>
                                    <td>
                                        <h2>{{ $filters.messageDateTimeFormat(chat.requested_at_timestamp) }}</h2>
                                    </td>
                                    <td>
                                        <div class="Categories-btn">
                                            <button class="thm-btn success-thm"
                                                @click="acceptChatRequests(chat, c_index)">Accept</button>
                                            <button class="thm-btn danger-thm" data-bs-toggle="modal"
                                                data-bs-target="#rejectdetails" v-if="false">Reject</button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div class="operator-table-footer">
                        <div class="entries-sec">
                            <div class="thm-heading">
                                <h2>Show</h2>
                            </div>
                            <div class="entries-select">
                                <select class="form-select" aria-label="Default select example">
                                    <option selected="">01</option>
                                    <option value="1">02</option>
                                    <option value="2">03</option>
                                    <option value="3">04</option>
                                </select>
                            </div>
                            <div class="thm-heading">
                                <h2>entries</h2>
                            </div>
                        </div>
                        <div class="entries-pages">
                            <div class="thm-heading">
                                <h2>Showing 1 to 10 of 12 entries</h2>
                            </div>
                            <div class="entries-pagination">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                        <li class="page-item"><a class="page-link active" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
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
export default {
    name: 'ChatRequestListComponent',
    data() {
        return {
            chatRequestsList: null
        }
    },
    mounted() {
        this.getChatRequests();
    },
    methods: {
        getChatRequests() {
            this.$store.commit('is_loader', true);

            axios.get('/get-chat-requests')
                .then(res => {
                    if (res.status == 200) {
                        this.chatRequestsList = res.data.data;
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
                        this.chatRequestsList.splice(position, 1);
                        console.log(res);
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.$toast.error(e.response.message ?? e.response.data.message);
                    this.$store.commit('is_loader', false);
                    console.error(e);
                })
        },
    }

}
</script>

<style>
.Categories-btn {
    justify-content: center;
}
</style>