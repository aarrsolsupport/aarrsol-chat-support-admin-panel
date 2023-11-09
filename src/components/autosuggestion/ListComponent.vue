<template>
    <div class="borad-inner-body-sec">
        <div class="borad-inner-body">
            <div class="borad-inner-body-con">
                <div class="search-sec" v-if="show_search">
                    <div class="search-input-sec">
                        <input id="search" type="text" placeholder="Search" v-model="search">
                        <div class="search-icon">
                            <img src="@/assets/images/search-icon.svg" alt="">
                        </div>
                    </div>
                    <div class="operator-btn">
                        <!-- <button type="button" @click="closeForm" class="btn btn-primary">Refresh List</button> -->
                        <button class="thm-btn" data-bs-toggle="offcanvas" data-bs-target="#agentoffcanvas"
                            aria-controls="agentoffcanvas" ref="addBtn"> Add New </button>
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
                                        <h2>Message</h2>
                                    </th>
                                    <th>
                                        <h2>Action</h2>
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
                                        <h2 :title="item.description">{{ item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description }}</h2>
                                    </td>
                                    <td>
                                        <div class="send-btn-sec justify-content-start">
                                            <div class="more-action-sec">
                                                <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                        src="@/assets/images/more-action.svg" alt=""></button>
                                                <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                    <li>
                                                        <button class="dropdown-item more-list-btn" type="button"
                                                            @click="editAutoSuggestion(item)">
                                                            <div class="edit-icon"><img src="@/assets/images/edit-icon.svg"
                                                                    alt=""></div>
                                                            <div class="thm-heading">
                                                                <h2>Edit</h2>
                                                            </div>
                                                        </button>
                                                    </li>
                                                    <!-- <li class="todo border border-warning">
                                                        <button class="dropdown-item more-list-btn" type="button">
                                                            <div class="edit-icon"><img src="@/assets/images/document-copy.svg"
                                                                    alt=""></div>
                                                            <div class="thm-heading">
                                                                <h2>Duplicate *TO-DO*</h2>
                                                            </div>
                                                        </button>
                                                    </li> -->
                                                    <li>
                                                        <button class="dropdown-item more-list-btn" type="button"
                                                            @click="deleteSuggestions(item.id)">
                                                            <div class="edit-icon"><img src="@/assets/images/delete-icon.svg"
                                                                    alt=""></div>
                                                            <div class="thm-heading">
                                                                <h2>Delete</h2>
                                                            </div>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
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
        <suggetFormComponent @updatedSuggestionList="updateSuggestList" :updateData="updateData">
        </suggetFormComponent>
    </div>
</template>
<script>
import suggetFormComponent from './FormComponent.vue'
import PaginationComponent from '../PaginationComponent.vue'
import axios from "axios"
export default {
    name: 'ListComponent',
    components: {
        suggetFormComponent,
        PaginationComponent
    },
    data() {
        return {
            resource: 'auto-suggestions',

            search: '',
            listItems: {},
            show_search: this.hideSearch ? false : true,
            pagination_data: {
                "from": 1,
                "to": 10,
                "total": 10,
                "links": {},
                "current_page": 1,
                "per_page": 20,
            },
            updateData: null,
            mediaBaseUrl: ''
        }
    },
    computed: {
        filteredItems() {
            const filtered_data = this.listItems;
            if (this.search) {
                return filtered_data.filter(item =>
                (
                    item.description.toLowerCase().includes(this.search.toLowerCase())
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
                if (this.whitelabel_id) {
                    url += '&parentid=' + this.whitelabel_id;
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
                        this.mediaBaseUrl = res.data.data.media_base_url;
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.$toast.error(e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
            }
        },
        deleteSuggestions(item) {
            this.$store.commit('is_loader', true);
            axios.post('/' + this.resource + '/delete', { "id": item }).then(res => {
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                    let deletedSuggestion = this.listItems.findIndex(sitem => sitem.id == item);
                    this.listItems.splice(deletedSuggestion, 1)
                    this.$toast.success(res.data.message);
                }
                this.$store.commit('is_loader', false);
            }).catch(e => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            })
        },
        updateSuggestList() {
            this.getListItems();
        },
        editAutoSuggestion(item) {
            let dataToUpdate = JSON.parse(JSON.stringify(item));
            dataToUpdate.file_paths = dataToUpdate.file_paths?.split('\n') || null
            this.updateData = {
                ...dataToUpdate,
                is_update: true,
                mediaBaseUrl: this.mediaBaseUrl
            };
            this.$refs.addBtn.click();
        }
    },
    mounted() {
        this.getListItems();
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
        }
    },
}
</script>