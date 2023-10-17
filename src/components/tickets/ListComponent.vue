<template>
    <div class="borad-inner-body">
        <div class="borad-inner-body-con">
            <div class="search-sec bg-transparent border-0 p-0">
                <div class="search-input-sec w-100">
                    <input type="text" placeholder="Search" v-model="search">
                    <div class="search-icon">
                        <img src="@/assets/images/search-icon.svg" alt="">
                    </div>
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
                                <th>
                                    <h2> User ID</h2>
                                </th>
                                <th>
                                    <h2> Chat ID</h2>
                                </th>
                                <th class="todo border border-warning">
                                    <h2> Issue ID</h2>
                                </th>
                                <th class="todo border border-warning">
                                    <h2> Operator ID</h2>
                                </th>
                                <th class="todo border border-warning">
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
                                <td>
                                    <h2>{{ item.end_user.userid }}</h2>
                                </td>
                                <td>
                                    <h2>{{ item.chat_id }}</h2>
                                </td>
                                <td class="todo border border-warning">
                                    <h2>{{ item.issue_description }}</h2>
                                </td>
                                <td class="todo border border-warning">
                                    <h2>{{ item.operator_user.userid }}</h2>
                                </td>
                                <td class="todo border border-warning">
                                    <h2>{{ item.whitelabel_user.userid  }}</h2>
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
                                                    aria-labelledby="dropdownMenuButton1" >
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
                                    <h2>{{ item.description.length > 15 ? item.description.substring(0, 15) + '...' :
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
    data() {
        return {
            resource: 'tickets',

            search: '',
            listItems: {},

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
        '$store.state.data':function () {
            for (var i = 0; i < this.listItems.length; i++) { 
                if(this.listItems[i].id==this.$store.state.data.id ){
                    this.listItems[i].status = this.$store.state.data.status
                }
            }
        },
        '$store.state.item_data':function () {
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
                    || item.end_user.userid.toLowerCase().includes(this.search.toLowerCase())
                    || item.description.toLowerCase().includes(this.search.toLowerCase())
                )
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
                axios.get(url).then(res => {
                    if (res.data.error === true) {
                        this.$toast.error(res.data.message);
                    } else {
                        this.listItems = res.data.data.list_items.data;
                        this.pagination_data.total = res.data.data.list_items.total;
                        this.pagination_data.from = res.data.data.list_items.from;
                        this.pagination_data.to = res.data.data.list_items.to;
                        this.pagination_data.links = res.data.data.list_items.links;
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
            if(item.status != status) {
                this.update_item_details = { id: item.id, status: status };
            }
        },
        setUpdateDetails(data) {
            this.update_item_details = data;
        }
    },
    created() {
        this.getListItems();
    },
}
</script>