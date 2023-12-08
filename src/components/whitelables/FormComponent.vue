<template>
    <!--Operator offcanvas-->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="whitelabeloffcanvas" aria-labelledby="whitelabeloffcanvasLabel">
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
                        <label for="name" class="form-label">Whitelabels Name</label>
                        <input id="name" type="text" class="form-control" placeholder="Enter Name" v-model="item_data.name" :class="v$.item_data.name.$error ? 'border border-danger' : ''" autocomplete="off">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.name">
                            <li v-for="(err, e) in errorsList.name" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item" v-if="item_data.userid != undefined && itemForm != 2 ">
                        <label for="userid" class="form-label">Login ID</label>
                        <input id="userid" type="text" class="form-control" placeholder="Enter Login ID" v-model="item_data.userid" :class="v$.item_data.userid.$error ? 'border border-danger' : ''">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.userid">
                            <li v-for="(err, e) in errorsList.userid" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item" v-if="item_data.password != undefined ">
                        <label for="password" class="form-label">Password</label>
                        <input id="password" type="text" class="form-control" placeholder="Enter Password" v-model="item_data.password" :class="v$.item_data.password.$error ? 'border border-danger' : ''">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.password">
                            <li v-for="(err, e) in errorsList.password" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item" v-if="item_data.password_confirmation != undefined ">
                        <label for="password_confirmation" class="form-label">Confirm Password  </label>
                        <input id="password_confirmation" type="text" class="form-control" placeholder="Enter Confirm Password" v-model="item_data.password_confirmation" :class="v$.item_data.password_confirmation.$error ? 'border border-danger' : ''">
                    </div>

                    <div class="operator-item" v-if="item_data.website_url != undefined">
                        <label for="website_url" class="form-label">Website URL</label>
                        <input id="website_url" type="text" class="form-control" placeholder="Enter Website URL" v-model="item_data.website_url" :class="v$.item_data.website_url.$error ? 'border border-danger' : ''">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.website_url">
                            <li v-for="(err, e) in errorsList.website_url" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item" v-if="item_data.website_id != undefined && itemForm != 2">
                        <label for="website_id" class="form-label">Website ID</label>
                        <input id="website_id" type="text" class="form-control" placeholder="Enter Website ID" v-model="item_data.website_id" :class="v$.item_data.website_id.$error ? 'border border-danger' : ''">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.website_id">
                            <li v-for="(err, e) in errorsList.website_id" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item entries-select" v-if="item_data.is_active != undefined ">
                        <label for="is_active" class="form-label">Status</label>
                        <select id="is_active" class="form-select" aria-label="Default select example" v-model="item_data.is_active">
                            <option value=1>Active</option>
                            <option value=0>Inactive</option>
                        </select>
                    </div>
                </div>
            </form>
            <div class="operator-offcanvas-footer">
                <button class="thm-btn thm-border-btn" data-bs-dismiss="offcanvas" aria-label="Close" ref="wlCloseBtn" >Close</button>
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
        name: 'FormComponent',
        data() {
            return {            
                resource: 'white-labels',
                itemForm: 1,
                form_title: "Add Whitelables",
                item_data: {
                    'name': '',
                    'userid': '',
                    'password': '',
                    'password_confirmation': '',
                    'website_url': '',
                    'website_id': '',
                    'is_active': 1
                },
                errorsList: {},
            }
        },
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
        watch: {
            '$store.state.wl_edit': function () {
                var e_data = this.$store.state.wl_edit
                this.setupWlForm(e_data.form_type, e_data.form_item)
            }
        },
        methods: {
            setupWlForm(type, item) {
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
                            'is_active': 1,
                            'form_type': type  // Add
                        }
                        break;
                    case 2: // Setup Edit form Data & requisites
                        this.form_title = "Edit Whitelabels"
                        this.item_data = {
                            'id': item.id,
                            'name': item.name,
                            'userid': item.userid,
                            'website_url': item.website_details.website_url,
                            'website_id': item.website_details.website_id,
                            'is_active': (item.is_active == 1) ? 1 : 0 ,
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
            saveItem() {
                this.v$.$touch()
                if (this.v$.$error) {
                    return false
                }else{
                    this.$store.commit('is_loader', true);
                    if(this.item_data.id) {
                        // EDIT & UPDATE
                        axios.post('/'+this.resource+'/update', this.item_data)
                        .then(res => {
                            if(res.data.error == true){  
                                this.$toast.error(res.data.message);
                                this.errorsList = res.data.data;
                            }else{
                                if(this.item_data.form_type == 2) {
                                    this.$store.commit('white_lable_data_Updated', {'change': 2, 'item': this.item_data});
                                }
                                this.$toast.success(res.data.message);
                                this.$refs.wlCloseBtn.click();
                            }
                            this.$store.commit('is_loader', false);
                        }).catch(e => {
                            this.$toast.error(e.response.data.message);
                            this.$store.commit('is_loader', false);
                        })
                    } else {
                        // ADD
                        axios.post('/'+this.resource+'/create', this.item_data)
                        .then(res => {
                            if(res.data.error == true){  
                                this.$toast.error(res.data.message);
                                this.errorsList = res.data.data;
                            }else{
                                res.data.data.is_active = this.item_data.is_active
                                this.$store.commit('white_lable_data_Updated', {'change': 1, 'item': res.data});
                                this.$toast.success(res.data.message);
                                this.$refs.wlCloseBtn.click();
                            }
                            this.$store.commit('is_loader', false);
                        }).catch(e => {
                            this.$toast.error(e.response.data.message);
                            this.$store.commit('is_loader', false);
                        })
                    }
                }
            },
        },
    }
</script>