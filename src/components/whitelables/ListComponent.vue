<template>
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
                    <button class="thm-btn" data-bs-toggle="offcanvas" data-bs-target="#whitelabeloffcanvas" aria-controls="whitelabeloffcanvas" @click="setWlForm(1, {})"> Add Whitelable </button>
                </div>
            </div>
            <div class="operator-table-sec">
                <div class="operator-table-con">
                    <table class="table thm-heading">
                        <thead>
                            <tr>
                                <th><h2> S.No</h2></th>
                                <th><h2> Whitelable Name</h2></th>
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
                                    <router-link :to="'/whitelable-details/' + item.id"><h2>{{ item.name }}</h2></router-link> 
                                </td>
                                <td><h2>{{ item.userid }}</h2></td>
                                <td class="website-link"><a v-if="item.website_details" :href="item.website_details.website_url" target="_blank"><h2>{{ item.website_details.website_url }}</h2></a></td>
                                <td><h2 v-if="item.website_details">{{ item.website_details.website_id }}</h2></td>
                                <td>
                                    <div class="operator-check-con">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" :id="'flexSwitchCheckDefault.'+item.id" :checked="item.is_active" @click="toggleStatus(item)">
                                        </div>   
                                    </div>   
                                </td>
                                <td> 
                                    <div class="more-action-sec">
                                        <button class="more-action-btn" data-bs-toggle="dropdown"><img src="@/assets/images/more-action.svg" alt=""></button>
                                        <ul class="dropdown-menu dropdown-menu-end more-action-list" >
                                            <li>
                                                <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#whitelabeloffcanvas" aria-controls="whitelabeloffcanvas" @click="setWlForm(2, item)">
                                                    <div class="edit-icon"><img src="@/assets/images/edit-icon.svg" alt=""></div>
                                                    <div class="thm-heading"><h2>Edit</h2></div> 
                                                </button>
                                            </li>
                                            <li>
                                                <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#whitelabeloffcanvas" aria-controls="whitelabeloffcanvas" @click="setWlForm(3, item)">
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
    <WLFormComponent></WLFormComponent>
</template>
<script>
    import WLFormComponent from './FormComponent.vue'
    import PaginationComponent from '../PaginationComponent.vue'
    import axios from "axios"
    export default {
        name: 'ListComponent',
        props: ['hideSearch', 'operator_id'],
        components: {
            WLFormComponent,
            PaginationComponent
        },
        data() {
            return {
                resource: 'white-labels',

                search: '',
                listItems: {},
                show_search: this.hideSearch ? false : true, 
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
            '$store.state.white_lable_change': function () {
                for (var i = 0; i < this.listItems.length; i++) { 
                    if(this.listItems[i].id==this.$store.state.white_lable_change.item.id && this.$store.state.white_lable_change.item.form_type ==2){
                       this.listItems[i].name = this.$store.state.white_lable_change.item.name
                        this.listItems[i].website_details.website_url = this.$store.state.white_lable_change.item.website_url
                        this.listItems[i].website_details.website_id = this.$store.state.white_lable_change.item.website_id
                        this.listItems[i].userid = this.$store.state.white_lable_change.item.userid
                        this.listItems[i].is_active = (this.$store.state.white_lable_change.item.is_active == 1) ? 1 : 0;
                    }
                }
                if(this.$store.state.white_lable_change.change==1){
                    let list = {
                                    id: this.$store.state.white_lable_change.item.data.id,
                                    name: this.$store.state.white_lable_change.item.data.name,
                                    is_active: (this.$store.state.white_lable_change.item.data.is_active == 1) ? 1 : 0,
                                    userid: this.$store.state.white_lable_change.item.data.userid,
                                    website_details: {
                                        user_id: this.$store.state.white_lable_change.item.data.website_details.user_id,
                                        website_id: this.$store.state.white_lable_change.item.data.website_details.website_id,
                                        website_url: this.$store.state.white_lable_change.item.data.website_details.website_url
                                    }
                                };
                    this.listItems.unshift(list);
                    if(this.listItems.length >= this.pagination_data.per_page)
                        this.listItems.pop();
                }
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
            setWlForm(type, item) {
                this.$store.commit('wl_data_Edit', {
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
                    if(this.operator_id) {
                        url += '&parentid='+this.operator_id;
                    }

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
                        item.is_active = (item.is_active == 1) ? 0 : 1 
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
<style scoped>
 .operator-tab-item-two .borad-inner-body{
margin-top: 0px;
}
.operator-tab-item-two .borad-inner-body .operator-table-sec{
margin-top: 0px;
}

</style>