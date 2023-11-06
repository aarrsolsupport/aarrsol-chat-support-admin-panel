<template>
    <div class="borad-inner-body-sec">
        <div class="borad-inner-body">
            <div class="borad-inner-body-con" v-if="details">
                <div class="operator-detail-wrapper">
                    <div class="search-sec operator-detail-sec">
                        <div class="tickets-modal-list-sec">
                            <div class="tickets-details-modal-list">
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Agent Name</span>
                                        <h3>{{ details.name }}</h3>
                                    </div>
                                </div>
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Login ID</span>
                                        <h3>{{ details.userid }}</h3>
                                    </div>
                                </div>
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Categories</span>
                                        <div class="Categories-btn tickets-details-item">
                                            <button v-for="(cat, index) in details.categories" class="thm-btn grey-bg" :key="index">{{ cat.description }}</button>
                                            <!-- <button class="thm-btn more-btn ">2 More</button>   -->
                                        </div>
                                    </div>
                                </div>
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Status</span>
                                        <div class="operator-check-con">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox"
                                                    :id="'flexSwitchCheckDefault.' + details.id"
                                                    :checked="details.is_active ?? null" @click="toggleStatus(details)">
                                                <label for="flexSwitchCheckDefault">Active</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="operator-detail-item">
                            <div class="more-action-sec">
                                <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                        src="@/assets/images/more-operator-detail.svg" alt=""></button>
                                <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                    <li>
                                        <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas"
                                            data-bs-target="#agentoffcanvas" aria-controls="agentoffcanvas"
                                            @click="setAgForm(2, details)">
                                            <div class="edit-icon"><img src="@/assets/images/edit-icon.svg" alt=""></div>
                                            <div class="thm-heading">
                                                <h2>Edit</h2>
                                            </div>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas"
                                            data-bs-target="#agentoffcanvas" aria-controls="agentoffcanvas"
                                            @click="setAgForm(3, details)">
                                            <div class="edit-icon"><img src="@/assets/images/update-password.svg" alt=""></div>
                                            <div class="thm-heading">
                                                <h2>Update Password</h2>
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="operator-detail-tab">
                        <div class="operator-detail-sec">
                            <ul class="nav nav-pills " id="pills-tab" role="tablist">
                                <li class="nav-item todo border border-warning" role="presentation">
                                    <button class="nav-link active" id="pills-user-chat-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-user-chat-flow" type="button" role="tab"
                                        aria-controls="pills-user-chat-flow" aria-selected="true">Chat With User</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-tickets-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-tickets" type="button" role="tab" aria-controls="pills-tickets"
                                        aria-selected="false">Tickets</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="operator-table-sec">
                    <div class="operator-detail-tab-con">
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active todo border border-warning" id="pills-user-chat-flow" role="tabpanel"
                                aria-labelledby="pills-user-chat-flow-tab">
                                <div class="operator-tab-item-one">
                                    <div class="thm-heading">
                                        <h2>Chatbot Flow </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-tickets" role="tabpanel"
                                aria-labelledby="pills-tickets-tab">
                                <TicketComponent :userid="item_id"></TicketComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AgFormComponent></AgFormComponent>
    </div>
</template>
<script>
import AgFormComponent from './FormComponent.vue';
import TicketComponent from '../tickets/ListComponent.vue';
import axios from "axios"
export default {
    name: 'DetailComponent',
    components: {
        AgFormComponent,
        TicketComponent
    },
    props: ['item_id'],
    data() {
        return {
            resource: 'agents',
            details: {}
        }
    },
    watch: {
        '$store.state.agent_change': function () {
            this.details.name = this.$store.state.agent_change.item.name
            this.details.userid = this.$store.state.agent_change.item.userid
            this.details.is_active = (this.$store.state.agent_change.item.is_active == 1) ? 1 : 0;
            this.details.categories = Object.assign({}, this.$store.state.agent_change.item.categories)
        }
    },
    mounted() {
        this.getItemDetails();
    },
    methods: {
        setAgForm(type, item) {
            this.$store.commit('ag_data_Edit', {
                'form_type': type,
                'form_item': item
            })
        },
        getItemDetails() {
            this.$store.commit('is_loader', true);
            axios.post('/' + this.resource + '/get-details', { 'id': this.item_id }).then(res => {
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                    this.details = res.data.data.details;
                }
                this.$store.commit('is_loader', false);
            }).catch(e => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            })
        },
        toggleStatus(item) {
            this.$store.commit('is_loader', true);
            axios.post('/' + this.resource + '/toggle-status', { "id": item.id }).then(res => {
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                    this.$toast.success(res.data.message);
                    item.is_active = (item.is_active == 1) ? 0 : 1;
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