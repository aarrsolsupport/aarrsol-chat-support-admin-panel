<template>
    <div class="borad-inner-body-sec">
        <div class="borad-inner-body">
            <div class="borad-inner-body-con">
                <div class="search-sec bg-transparent border-0 p-0 ticket-filter-search-sec">
                    <div class="search-input-sec">
                        <input type="text" placeholder="Search" v-model="search">
                        <div class="search-icon">
                            <img src="@/assets/images/search-icon.svg" alt="">
                        </div>
                    </div>
                    <div class="dropdown entries-select-dropdown ms-3 ticket-filter">
                        <button class="thm-btn dropdown-toggle entries-select-list" :class="statusFilters.class"
                            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                            ref="closeStatusFilter">
                            <div class="thm-heading">
                                <h2>{{ statusFilters.statusName }}</h2>
                            </div>
                        </button>
                        <ul class="dropdown-menu entries-select-list dropdown-menu-end  "
                            aria-labelledby="dropdownMenuButton1">
                            <li @click="setStatus(null, 'All', '')">
                                <a class="dropdown-item" href="#">
                                    <div class="thm-heading">
                                        <h2>All</h2>
                                    </div>
                                </a>
                            </li>
                            <li class="pending-thm" @click="setStatus(2, 'Pending', 'pending-thm')">
                                <a class="dropdown-item" href="#">
                                    <div class="thm-heading">
                                        <h2>Pending</h2>
                                    </div>
                                </a>
                            </li>
                            <li class="open-thm" @click="setStatus(0, 'Open', 'open-thm')">
                                <a class="dropdown-item" href="#">
                                    <div class="thm-heading">
                                        <h2>Open</h2>
                                    </div>
                                </a>
                            </li>
                            <li class="close-thm" @click="setStatus(1, 'Close', 'close-thm')">
                                <a class="dropdown-item" href="#">
                                    <div class="thm-heading">
                                        <h2>Close</h2>
                                    </div>

                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="operator-table-sec tickets-table-sec">
                    <div class="operator-table-con">
                        <table class="table thm-heading">
                            <thead>
                                <tr>
                                    <th>
                                        <h2> S.No</h2>
                                    </th>
                                    <th>
                                        <h2> Ticket ID</h2>
                                    </th>
                                    <th>
                                        <h2> Generate At</h2>
                                    </th>
                                    <!-- <th>
                                        <h2> Chat ID</h2>
                                    </th> -->
                                    <th>
                                        <h2> Issue Category</h2>
                                    </th>
                                    <th v-if="userData?.role_id == 1">
                                        <h2> Operator ID</h2>
                                    </th>
                                    <th v-if="userData?.role_id == 3">
                                        <h2> Agent ID</h2>
                                    </th>
                                    <th v-if="userData?.role_id == 1 || userData?.role_id == 2">
                                        <h2> Whitelabel ID</h2>
                                    </th>
                                    <th>
                                        <h2> Status</h2>
                                    </th>
                                    <th>
                                        <h2> Description</h2>
                                    </th>
                                    <th>
                                        <h2> Action</h2>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in filteredItems" :key="index">
                                    <th>
                                        <h2>{{ ((pagination_data.current_page - parseInt(1)) * pagination_data.per_page) +
                                            index + parseInt(1) }}</h2>
                                    </th>
                                    <td>
                                        <h2 class="text-uppercase">{{ item.ticket_id }}</h2>
                                    </td>
                                    <td>
                                        <h2>{{ $filters.localDateTimeFormat(item.created_at) }}</h2>
                                    </td>
                                    <!-- <td>
                                        <h2>{{ item.chat_id }}</h2>
                                    </td> -->
                                    <td>
                                        <h2>{{ item.issue_category?.description || '-' }}</h2>
                                    </td>
                                    <td v-if="userData?.role_id == 1">
                                        <h2>{{ item.operator_user?.userid || '' }}</h2>
                                    </td>
                                    <td v-if="userData?.role_id == 3">
                                        <h2>{{ item.added_by_user?.userid || '' }}</h2>
                                    </td>
                                    <td v-if="userData?.role_id == 1 || userData?.role_id == 2">
                                        <h2>{{ item.whitelabel_user?.userid || '' }}</h2>
                                    </td>
                                    <td>
                                        <div class="status-sec">
                                            <div class="entries-select ">
                                                <div class="dropdown entries-select-dropdown">
                                                    <button class="thm-btn dropdown-toggle entries-select-list"
                                                        :class="ticket_status[item.status].theme" type="button"
                                                        id="dropdownMenuButton1" data-bs-toggle="dropdown"
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
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h2 :title="item.description">{{ item.description.length > 15 ?
                                            item.description.substring(0, 15) + '...' :
                                            item.description }}</h2>
                                    </td>
                                    <td>
                                        <div class="more-action-sec">
                                            <button class="more-action-btn thm-btn thm-border-btn view-btn"
                                                data-bs-toggle="modal" data-bs-target="#ticketsdetails"
                                                @click="showItemDetails(item)">
                                                <div class="view-img">
                                                    <img src="@/assets/images/view-action.svg" alt="">
                                                </div>
                                                View
                                            </button>
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
        </div>
        <DetailComponent :item="item_details"></DetailComponent>
        <UpdateComponent :item="update_item_details"></UpdateComponent>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import DetailComponent from './DetailComponent.vue'
import UpdateComponent from './UpdateComponent.vue'
import PaginationComponent from '../PaginationComponent.vue'
import axios from "axios"
export default {
    name: 'ListComponent',
    components: {
        PaginationComponent,
        DetailComponent,
        UpdateComponent
    },
    props: ['userid'],
    data() {
        return {
            resource: 'tickets',

            search: '',
            listItems: {},
            userData: null,

            pagination_data: {
                "from": 1,
                "to": 10,
                "total": 10,
                "links": {},
                "current_page": 1,
                "per_page": 5,
            },

            item_details: {},
            update_item_details: {},
            statusFilters: {
                status: null,
                class: '',
                statusName: 'All'
            }
        }
    },
    watch: {
        '$store.state.refreshData': function () {
            var ref_data = this.$store.state.refreshData
            if (ref_data) {
                for (const [key, value] of Object.entries(ref_data.data)) {
                    this.pagination_data[key] = value
                }
                if (ref_data.refresh) {
                    this.getListItems()
                }
            }
        },
        '$store.state.data': function () {
            for (var i = 0; i < this.listItems.length; i++) {
                if (this.listItems[i].id == this.$store.state.data.id) {
                    this.listItems[i].status = this.$store.state.data.status
                }
            }
        },
        '$store.state.item_data': function () {
            this.setUpdateDetails(this.$store.state.item_data);
        }
    },
    computed: {
        ...mapState(['ticket_status']),
        filteredItems() {
            const filtered_data = this.listItems;
            if (this.search) {
                return filtered_data.filter(item =>
                (
                    item.ticket_id.toLowerCase().includes(this.search.toLowerCase())
                    || (item.end_user && item.end_user.userid.toLowerCase().includes(this.search.toLowerCase()))
                    || (item.operator_user && item.operator_user.userid.toLowerCase().includes(this.search.toLowerCase()))
                    || (item.whitelabel_user && item.whitelabel_user.userid.toLowerCase().includes(this.search.toLowerCase()))
                    || item.description.toLowerCase().includes(this.search.toLowerCase())
                )
                );
            }
            if (this.statusFilters.status != null) {
                return filtered_data.filter(item =>
                    item.status === this.statusFilters.status
                );
            }
            return filtered_data;
        }
    },
    methods: {
        getListItems(url = '') {
            if (url != null) {
                this.$store.commit('is_loader', true);
                if (url) {
                    const urlParams = new URLSearchParams(url.split('?')[1]);
                    const page_number = urlParams.get('page')
                    if (isFinite(page_number)) {
                        this.pagination_data.current_page = page_number;
                    }
                } else {
                    url = '/' + this.resource + '/get-list?page=' + this.pagination_data.current_page;
                }
                url += '&per_page=' + this.pagination_data.per_page;
                if (this.userid) {
                    url += `&userid=${this.userid}`
                }
                axios.get(url).then(res => {
                    if (res.data.error === true) {
                        this.$toast.error(res.data.message);
                    } else {
                        this.listItems = res.data.data.list_items.data;
                        this.pagination_data.total = res.data.data.list_items.total;
                        this.pagination_data.from = res.data.data.list_items.from;
                        this.pagination_data.to = res.data.data.list_items.to;
                        this.pagination_data.links = res.data.data.list_items.links;
                        this.userData = res.data.data.user
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.$toast.error(e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
            }
        },
        showItemDetails(item) {
            if (item && item.id) {
                this.$store.commit('is_loader', true);
                axios.post("/tickets/get-remarks", { "id": item.id }).then(res => {
                    if (res.data.error === true) {
                        this.$toast.error(res.data.message);
                    } else {
                        item.remarks = res.data.data.remarks;
                        item.role_id = this.userData.role_id;
                        item.user_id = this.userData.id;
                        item.parent_id = this.userData.parent_id;
                        this.item_details = item;
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.$toast.error(e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
            }
            this.$store.commit('singledata', item)

        },
        setDetails(item, status) {
            if (item.status != status) {
                this.update_item_details = { id: item.id, status: status };
            }
        },
        setUpdateDetails(data) {
            this.update_item_details = data;
        },
        setStatus(status, statusName, className) {
            this.statusFilters.status = status;
            this.statusFilters.class = className;
            this.statusFilters.statusName = statusName
            this.$refs.closeStatusFilter.click();
        }
    },
    created() {
        this.getListItems();
    },
}
</script>

<style>
.ticket-filter-search-sec {
    justify-content: flex-start;
}

.ticket-filter button {
    height: 2.4rem;
}
</style>