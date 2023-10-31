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
                                        <span>Whitelabel Name</span>
                                        <h3>{{ details.name }}</h3>
                                    </div>
                                </div>
                                <template v-if="details.website_details">
                                    <div class="tickets-modal-item">
                                        <div class="thm-heading">
                                            <span>Website URL</span>
                                            <a class="website-link" :href="details.website_details.website_url" target="_blank">
                                                <h3>{{ details.website_details.website_url }}</h3>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="tickets-modal-item">
                                        <div class="thm-heading">
                                            <span>Website ID</span>
                                            <h3>{{ details.website_details.website_id }}</h3>
                                        </div>
                                    </div>
                                </template>
                                <div class="tickets-modal-item">
                                    <div class="thm-heading">
                                        <span>Login ID</span>
                                        <h3>{{ details.userid }}</h3>
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
                                            data-bs-target="#whitelabeloffcanvas" aria-controls="whitelabeloffcanvas"
                                            @click="setWlForm(2, details)">
                                            <div class="edit-icon"><img src="@/assets/images/edit-icon.svg" alt=""></div>
                                            <div class="thm-heading">
                                                <h2>Edit</h2>
                                            </div>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas"
                                            data-bs-target="#whitelabeloffcanvas" aria-controls="whitelabeloffcanvas"
                                            @click="setWlForm(3, details)">
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
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="pills-chat-flow-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-chat-flow" type="button" role="tab"
                                        aria-controls="pills-chat-flow" aria-selected="true">Chat Flow</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-whiltelable-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-whiltelable" type="button" role="tab"
                                        aria-controls="pills-whiltelable" aria-selected="false">Agents</button>
                                </li>
                                <li class="nav-item todo border border-warning" role="presentation">
                                    <button class="nav-link" id="pills-themesettings-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-themesettings" type="button" role="tab"
                                        aria-controls="pills-themesettings" aria-selected="false">Theme Setting</button>
                                </li>
                                <li class="nav-item todo border border-warning" role="presentation">
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
                            <div class="tab-pane fade show active" id="pills-chat-flow" role="tabpanel"
                                aria-labelledby="pills-chat-flow-tab">
                                <div class="operator-tab-item-one">
                                    <ChatFlowComponent :user_id='item_id'></ChatFlowComponent>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-whiltelable" role="tabpanel"
                                aria-labelledby="pills-whiltelable-tab">
                                <div class="operator-tab-item-two">
                                    <AgentComponent :whitelabel_id='item_id' :hideSearch="1"></AgentComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <WlFormComponent></WlFormComponent>
    </div>
</template>
<script>
import AgentComponent from '../agents/ListComponent.vue';
import ChatFlowComponent from '../chat-flow/ListComponent.vue';
import WlFormComponent from './FormComponent.vue'
import axios from "axios"
export default {
    name: 'DetailComponent',
    components: {
        WlFormComponent,
        ChatFlowComponent,
        AgentComponent
    },
    props: ['item_id'],
    data() {
        return {
            resource: 'white-labels',
            details: {}
        }
    },
    watch: {
        '$store.state.white_lable_change': function () {
            this.details.name = this.$store.state.white_lable_change.item.name
            this.details.website_details.website_url = this.$store.state.white_lable_change.item.website_url
            this.details.website_details.website_id = this.$store.state.white_lable_change.item.website_id
            this.details.userid = this.$store.state.white_lable_change.item.userid
            this.details.is_active = (this.$store.state.white_lable_change.item.is_active == 1) ? 1 : 0;
        }
    },
    mounted() {
        this.getItemDetails();
    },
    methods: {
        setWlForm(type, item) {
            this.$store.commit('wl_data_Edit', {
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