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
                    <button class="thm-btn" data-bs-toggle="offcanvas" data-bs-target="#operatoroffcanvas" aria-controls="operatoroffcanvas" @click="setupForm(1, {})"> Add Operator </button>
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
                                <th><h2>{{ index+1 }}</h2></th>
                                <td class=" todo border border-warning"><h2>{{ item.name }}</h2></td>
                                <!-- <td class="website-link"> -->
                                    <!-- <router-link :to="'operators/detail/' + item.id"><h2>{{ item.name }}</h2></router-link> -->
                                <!-- </td> -->
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
                                                <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#operatoroffcanvas" aria-controls="operatoroffcanvas" @click="setupForm(2, item)">
                                                    <div class="edit-icon"><img src="@/assets/images/edit-icon.svg" alt=""></div>
                                                    <div class="thm-heading"><h2>Edit</h2></div> 
                                                </button>
                                            </li>
                                            <li>
                                                <button class="dropdown-item more-list-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#operatoroffcanvas" aria-controls="operatoroffcanvas" @click="setupForm(3, item)">
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
                <div class="operator-table-footer todo border border-warning">
                    <div class="entries-sec">
                        <div class="thm-heading">
                        <h2>Show</h2>
                        </div>
                        <div class="entries-select">
                        <select class="form-select" aria-label="Default select example" v-model="pagination_data.per_page" @change="getListItems">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        </div>
                        <div class="thm-heading">
                        <h2>entries</h2>
                        </div>
                    </div>
                    <div class="entries-pages">
                        <span class="text-primary">*TO-DO*</span>
                        <div class="thm-heading">
                            <h2>Showing {{ pagination_data.from }} to {{ pagination_data.to }} of {{ pagination_data.total }} entries</h2>
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
    
    <!--Operator offcanvas-->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="operatoroffcanvas" aria-labelledby="operatoroffcanvasLabel">
        <div class="offcanvas-header operator-offcanvas-sec">
            <div class="thm-heading">
                <h4>{{ form_title }}</h4>
            </div>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body operator-offcanvas-body">
            <form>
                <div class="operator-offcanvas-con">
                    <div class="operator-item" v-if="item_data.name != undefined ">
                        <label for="name" class="form-label">Operator Name</label>
                        <input type="text" class="form-control" placeholder="Enter Name" v-model="item_data.name" :class="v$.item_data.name.$error ? 'border border-danger' : ''">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.name">
                            <li v-for="(err, e) in errorsList.name" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item" v-if="item_data.userid != undefined ">
                        <label for="userid" class="form-label">Login ID</label>
                        <input type="text" class="form-control" placeholder="Enter Login ID" v-model="item_data.userid" :class="v$.item_data.userid.$error ? 'border border-danger' : ''">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.userid">
                            <li v-for="(err, e) in errorsList.userid" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item" v-if="item_data.password != undefined ">
                        <label for="password" class="form-label">Password</label>
                        <input type="text" class="form-control" placeholder="Enter Password" v-model="item_data.password" :class="v$.item_data.password.$error ? 'border border-danger' : ''">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.password">
                            <li v-for="(err, e) in errorsList.password" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item" v-if="item_data.password_confirmation != undefined ">
                        <label for="password_confirmation" class="form-label">Confirm Password  </label>
                        <input type="text" class="form-control" placeholder="Enter Confirm Password" v-model="item_data.password_confirmation" :class="v$.item_data.password_confirmation.$error ? 'border border-danger' : ''">
                    </div>

                    <div class="operator-item" v-if="item_data.website_url != undefined ">
                        <label for="website_url" class="form-label">Website URL</label>
                        <input type="text" class="form-control" placeholder="Enter Website URL" v-model="item_data.website_url" :class="v$.item_data.website_url.$error ? 'border border-danger' : ''">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.website_url">
                            <li v-for="(err, e) in errorsList.website_url" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item" v-if="item_data.website_id != undefined ">
                        <label for="website_id" class="form-label">Website ID</label>
                        <input type="text" class="form-control" placeholder="Enter Website ID" v-model="item_data.website_id" :class="v$.item_data.website_id.$error ? 'border border-danger' : ''">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.website_id">
                            <li v-for="(err, e) in errorsList.website_id" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item entries-select" v-if="item_data.is_active != undefined ">
                        <label for="is_active" class="form-label">Status</label>
                        <select class="form-select" aria-label="Default select example" v-model="item_data.is_active">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                </div>
            </form>
            <div class="operator-offcanvas-footer">
                <button class="thm-btn thm-border-btn" data-bs-dismiss="offcanvas" aria-label="Close" ref="closeBtn" >Close</button>
                <button type="button" class="thm-btn" @click="saveItem">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
    import { required } from '@vuelidate/validators'
    import { useVuelidate } from '@vuelidate/core'
    import axios from "axios"
    export default {
        name: 'ListComponent',
        setup () {
            return { v$: useVuelidate() }
        },
        validations() {
            switch(this.itemForm) {
                case 2: return {
                            item_data: {
                                name:{ required },
                                userid:{ required },
                                website_url:{ required },
                                website_id:{ required },
                            }
                        } 
                case 3: return {
                            item_data: {
                                password:{ required },
                                password_confirmation:{ required },
                            }
                        } 
                default: return {
                            item_data: {
                                name:{ required },
                                userid:{ required },
                                password:{ required },
                                password_confirmation:{ required },
                                website_url:{ required },
                                website_id:{ required },
                            }
                        }
            }
        },
        data() {
            return {
                search: '',
                form_title: "Add Operator",
                itemForm: 1,
                listItems: {},
                item_data: {
                    'name': '',
                    'userid': '',
                    'password': '',
                    'password_confirmation': '',
                    'website_url': '',
                    'website_id': '',
                    'is_active': true
                },
                errorsList: {},
                pagination_data: {
                    "current_page": 1,
                    "per_page": 10,
                    "from": 1,
                    "to": 10,
                    "total": 10
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
            setupForm(type, item = {}) {
                this.v$.$reset();
                this.errorsList = {};
                this.itemForm = type;
                switch(type) {
                    case 1: // Setup basic Add form requisites
                        this.item_data = {
                            'name': '',
                            'userid': '',
                            'password': '',
                            'password_confirmation': '',
                            'website_url': '',
                            'website_id': '',
                            'is_active': true,
                            'form_type': type  // Add
                        }
                        break;
                    case 2: // Setup Edit form Data & requisites
                        this.form_title = "Edit Operator"
                        this.item_data = {
                            'id': item.id,
                            'name': item.name,
                            'userid': item.userid,
                            'website_url': item.website_details.website_url,
                            'website_id': item.website_details.website_id,
                            'is_active': Boolean(item.is_active),
                            'form_type': type  // Update
                        }
                        break;
                    case 3: // Setup basic Change Password form requisites
                        this.form_title = "Change Password"
                        this.item_data = {
                            'id': item.id,
                            'password': '',
                            'password_confirmation': '',
                            'form_type': type  // Change Password
                        }
                        break;
                }
            },
            getListItems() {
                this.$store.commit('is_loader', true);
                axios.post('/operators/get-list', {
                    "paginate": true,
                    "pagination_data": this.pagination_data
                }).then(res => {
                    if(res.data.error === true){  
                        this.$toast.error(res.data.message);
                    }else{
                        this.listItems = res.data.data.list_items.data;
                        this.pagination_data.total = res.data.data.list_items.total;
                        this.pagination_data.from = res.data.data.list_items.from;
                        this.pagination_data.to = res.data.data.list_items.to;
                        // TO DO 
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.error_message = e.response.data.message;
                    this.$store.commit('is_loader', false);
                })
            },
            saveItem() {
                this.v$.$touch()
                if (this.v$.$error) {
                    return false
                }else{
                    this.$store.commit('is_loader', true);
                    if(this.item_data.id) {
                        // EDIT & UPDATE
                        axios.post('/operators/update', this.item_data)
                        .then(res => {
                            if(res.data.error == true){  
                                this.$toast.error(res.data.message);
                                this.errorsList = res.data.data;
                            }else{
                                this.$toast.success(res.data.message);
                                //  UPDATE item data in the list *TO-DO*
                                // console.log(['res', res.data])
                                this.$refs.closeBtn.click();
                            }
                            this.$store.commit('is_loader', false);
                        }).catch(e => {
                            this.error_message = e.response.data.message;
                            this.$store.commit('is_loader', false);
                        })
                    } else {
                        // ADD
                        axios.post('/operators/create', this.item_data)
                        .then(res => {
                            if(res.data.error == true){  
                                this.$toast.error(res.data.message);
                                this.errorsList = res.data.data;
                            }else{
                                this.$toast.success(res.data.message);
                                //  PUSH item in the list *TO-DO*
                                // console.log(['res', res.data])
                                this.$refs.closeBtn.click();
                            }
                            this.$store.commit('is_loader', false);
                        }).catch(e => {
                            this.error_message = e.response.data.message;
                            this.$store.commit('is_loader', false);
                        })
                    }
                }
            },
            toggleStatus(item) {
                this.$store.commit('is_loader', true);
                axios.post('/operators/toggle-status', {"id": item.id}).then(res => {
                    if(res.data.error === true){  
                        this.$toast.error(res.data.message);
                    }else{
                        this.$toast.success(res.data.message);
                        //  Update item in the list *TO-DO*
                        item.is_active = Boolean(!item.is_active);
                    }
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.error_message = e.response.data.message;
                    this.$store.commit('is_loader', false);
                })
            }
        },
        mounted() {
            this.getListItems();
        }, 
    }
</script>