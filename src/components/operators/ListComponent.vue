<template>
    <div class="borad-inner-body">
        <div class="borad-inner-body-con">
            <div class="search-sec">
                <div class="search-input-sec">
                    <input type="text" placeholder="Search" v-model="search">
                    <div class="search-icon">
                        <img src="@/assets/images/search-icon.svg" alt="">
                    </div>
                </div>
                <div class="operator-btn">
                    <!-- <button type="button" @click="closeForm" class="btn btn-primary">Refresh List</button> -->
                    <button class="thm-btn" data-bs-toggle="offcanvas" data-bs-target="#operatoroffcanvas" aria-controls="operatoroffcanvas" @click="setForm(1, {})"> Add Operator </button>
                </div>
            </div>
            <div class="operator-table-sec">
                <div class="operator-table-con">
                    <table class="table thm-heading">
                        <thead>
                            <tr>
                                <th><h2> S.No</h2></th>
                                <th><h2> Operator Name</h2></th>
                                <th><h2> Login ID</h2></th>
                                <th><h2> Website URL</h2></th>
                                <th><h2> Website ID</h2></th>
                                <th><h2> Status</h2></th>
                                <th><h2> Action</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in filteredItems" :key="index">
                                <th><h2>{{ ((pagination_data.current_page-parseInt(1))*pagination_data.per_page) + index+parseInt(1) }}</h2></th>
                                <td class="website-link">
                                    <router-link :to="'operator-details/' + item.id"><h2>{{ item.name }}</h2></router-link> 
                                </td>
                                <td><h2>{{ item.userid }}</h2></td>
                                <td class="website-link"><a :href="item.website_details.website_url" target="_blank"><h2>{{ item.website_details.website_url }}</h2></a></td>
                                <td><h2>{{ item.website_details.website_id }}</h2></td>
                                <td>
                                    <div class="operator-check-con">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" :id="'flexSwitchCheckDefault.'+item.id" :checked="item.is_active ?? null" @click="toggleStatus(item)">
                                        </div>   
                                    </div>   
                                </td>
                                <td> 
                                    <div class="more-action-sec">
                                        <button class="more-action-btn" data-bs-toggle="dropdown"><img src="@/assets/images/more-action.svg" alt=""></button>
                                        <ul class="dropdown-menu dropdown-menu-end more-action-list todo border border-warning" >
                                            <li>
                                                <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#operatoroffcanvas" aria-controls="operatoroffcanvas" @click="setForm(2, item)">
                                                    <div class="edit-icon"><img src="@/assets/images/edit-icon.svg" alt=""></div>
                                                    <div class="thm-heading"><h2>Edit</h2></div> 
                                                </button>
                                            </li>
                                            <li>
                                                <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#operatoroffcanvas" aria-controls="operatoroffcanvas" @click="setForm(3, item)">
                                                    <div class="edit-icon"><img src="@/assets/images/update-password.svg" alt=""></div>
                                                    <div class="thm-heading"> <h2>Update Password</h2></div> 
                                                </button>
                                            </li>
                                        </ul>
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
    <FormComponent></FormComponent>
</template>
<script>
    import FormComponent from './FormComponent.vue'
    import PaginationComponent from '../PaginationComponent.vue'
    import axios from "axios"
    export default {
        name: 'ListComponent',
        components: {
            FormComponent,
            PaginationComponent
        },
        data() {
            return {
                resource: 'operators',

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
            }
        },
        watch: {
            '$store.state.change': function () {
                for (var i = 0; i < this.listItems.length; i++) { 
                    if(this.listItems[i].id==this.$store.state.change.item.id && this.$store.state.change.item.form_type ==2){
                        this.listItems[i].name = this.$store.state.change.item.name
                        this.listItems[i].website_details.website_url = this.$store.state.change.item.website_url
                        this.listItems[i].website_details.website_id = this.$store.state.change.item.website_id
                        this.listItems[i].userid = this.$store.state.change.item.userid
                        this.listItems[i].is_active = (this.$store.state.change.item.is_active=='true')?1:0;
                    }
                }
                // *TO-DO* Push in list / update list
            },
            '$store.state.refreshData': function () {
                var ref_data = this.$store.state.refreshData
                if(ref_data) {
                    for (const [key, value] of Object.entries(ref_data.data)) {
                        this.pagination_data[key] = value
                    }
                    if(ref_data.refresh) {
                        this.getListItems()
                    }
                }
            }
        },
        computed: {
            filteredItems() { 
                const filtered_data = this.listItems;
                if (this.search) {
                    return filtered_data.filter(item =>
                        (
                        item.name.toLowerCase().includes(this.search.toLowerCase()) 
                            || item.userid.toLowerCase().includes(this.search.toLowerCase()) 
                                || item.website_details.website_url.toLowerCase().includes(this.search.toLowerCase()) 
                                    || item.website_details.website_id.toLowerCase().includes(this.search.toLowerCase())
                        ) 
                    );
                }
                return filtered_data;
            }
        },
        methods: {
            setForm(type, item) {
                this.$store.commit('data_Edit', {
                    'form_type': type,
                    'form_item': item
                })
            },
            getListItems(url = '') {
                if( url != null ) {
                    this.$store.commit('is_loader', true);
                    if(url) {
                        const urlParams = new URLSearchParams(url.split('?')[1]);
                        const page_number = urlParams.get('page')
                        if(isFinite(page_number))
                        {
                            this.pagination_data.current_page = page_number;
                        }
                    } else {
                        url = '/'+this.resource+'/get-list?page='+this.pagination_data.current_page;
                    }
                    url += '&per_page='+this.pagination_data.per_page;
                    axios.get(url).then(res => {
                        if(res.data.error === true){  
                            this.$toast.error(res.data.message);
                        }else{
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
            toggleStatus(item) {
                this.$store.commit('is_loader', true);
                axios.post('/'+this.resource+'/toggle-status', {"id": item.id}).then(res => {
                    if(res.data.error === true){  
                        this.$toast.error(res.data.message);
                    }else{
                        this.$toast.success(res.data.message);
                        //  Update item in the list *TO-DO*
                        item.is_active = Boolean(!item.is_active);
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.$toast.error(e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
            }
        },
        mounted() {
            this.getListItems();
        }, 
    }
</script>