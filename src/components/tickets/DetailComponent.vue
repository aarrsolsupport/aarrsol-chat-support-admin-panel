<template>
    <!-- Tickets Details modal -->
    <div class="modal fade" id="ticketsdetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered tickets-details-modal modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="thm-heading">
                        <h4>Tickets Details</h4>
                        <h3>Ticket ID :- <span class="text-uppercase">{{ item.ticket_id }}</span></h3>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="tickets-modal-list-sec">
                        <div class="tickets-details-modal-list">

                            <div class="tickets-modal-item">
                                <div class="thm-heading">
                                    <span>Chat ID</span>
                                    <h3>{{ item.chat_id }}</h3>
                                </div>
                            </div>

                            <div class="tickets-modal-item">
                                <div class="thm-heading">
                                    <span>Issue ID</span>
                                    <h3>{{ item.issue_id }}</h3>
                                </div>
                            </div>

                            <div class="tickets-modal-item">
                                <div class="thm-heading">
                                    <span>Generate At </span>
                                    <h3>{{ $filters.localDateTimeFormat(item.created_at) }}</h3>
                                </div>
                            </div>

                            <div class="tickets-modal-item">
                                <div class="thm-heading">
                                    <span>Opertaor ID</span>
                                    <h3 v-if = "item.operator_user">{{ item.operator_user.userid }}</h3>
                                </div>
                            </div>

                            <div class="tickets-modal-item">
                                <div class="thm-heading">
                                    <span>Whitelabel ID</span>
                                    <h3 v-if = "item.whitelabel_user">{{ item.whitelabel_user.userid }}</h3>
                                </div>
                            </div>

                            <div class="tickets-modal-item">
                                <div class="thm-heading">
                                    <span>Status</span>
                                    <div class="status-sec">
                                        <div class="entries-select ">
                                            <div class="dropdown entries-select-dropdown" v-if="item.status">
                                                <div class="thm-heading">
                                                    <span :class="ticket_status[item.status].theme">{{ ticket_status[item.status].text }}</span>
                                                </div>
                                                <!-- *TO-DO* -->
                                                <!-- <button class="thm-btn dropdown-toggle entries-select-list"
                                                    :class="ticket_status[item.status].theme"
                                                    type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                                    <div class="thm-heading">
                                                        <h2>{{ ticket_status[item.status].text }}</h2>
                                                    </div>
                                                </button>
                                                <ul class="dropdown-menu entries-select-list dropdown-menu-end  "
                                                    aria-labelledby="dropdownMenuButton1">
                                                    <li v-for="(status, id) in ticket_status" :key="id"
                                                        :class="status.theme" @click="setDetails(item, id)">
                                                        <a v-if="item.status == id" class="dropdown-item" href="#">
                                                            <div class="thm-heading">
                                                                <h2>{{ status.text }}</h2>
                                                            </div>
                                                        </a>
                                                        <a v-else class="dropdown-item" href="#" data-bs-toggle="modal"
                                                            data-bs-target="#statusdetails">
                                                            <div class="thm-heading">
                                                                <h2>{{ status.text }}</h2>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tickets-details-con">
                        <div class="thm-heading">
                            <h2>Message</h2>
                            <p>{{ item.description }}</p>
                        </div>
                        <div class="thm-heading" v-if="item.remarks">
                            <h2>Remarks</h2>
                            <p v-for="remark in item.remarks" :key="remark.id"> <span class="opacity-75">{{ remark.name }}
                                </span> {{ remark.remark }} <span class="opacity-75">{{
                                    $filters.localDateTimeFormat(remark.created_at) }} </span> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'DetailComponent',
    props: ['item'],
    computed: {
        ...mapState(['ticket_status']),
    },
    methods: {
        // setDetails(item, status) {
        //     if(item.status != status) {
        //         this.$emit('setUpdateDetails', { id: item.id, status: status })
        //     }
        // }
    }

}
</script>