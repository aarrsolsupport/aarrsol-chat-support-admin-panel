<template>
    <!--Operator offcanvas-->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="agentoffcanvas" aria-labelledby="agentoffcanvasLabel">
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
                        <label for="name" class="form-label">Agent Name</label>
                        <input id="name" type="text" class="form-control" placeholder="Enter Name" v-model="item_data.name" :class="v$.item_data.name.$error ? 'border border-danger' : ''" autocomplete="off">
                        <ul class="list-unstyled" v-if="errorsList && errorsList.name">
                            <li v-for="(err, e) in errorsList.name" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>
                    <div class="operator-item" v-if="item_data.userid != undefined ">
                        <label for="userid" class="form-label">Agent ID</label>
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
                    <div class="operator-item entries-select">
                        <label for="dropdownMenuButton1" class="form-label">Categories</label>
                        <div class="categories-dropdown" v-if="selectdescription.length>0">
                            <span  style = "margin-bottom:5px" v-for="selectedOption in selectdescription" :key="selectedOption.id" :title="selectedOption">{{ (selectedOption.length<13)?selectedOption:selectedOption/*selectedOption.slice(0, 17) + "..."*/ }}</span>
                        </div>
                   
                     <div class=" categories-sec">
                        <div class="dropdown entries-select-dropdown">
                           <button class="dropdown-toggle entries-select-list categories-value-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              Select     
                           </button>
                           <ul class="dropdown-menu dropdown-menu-center" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 44.8px, 0px);" aria-labelledby="dropdownMenuButton1" >
                                <li v-for="option in options" :key="option.id">
                                    <div class="categories-items categories-value-con">
                                        <input class="form-check-input" type="checkbox" v-model="selectedOptions" :value="option.id" :id="'opt_'+option.id">
                                        <label class="form-check-label" :for="'opt_'+option.id">{{ option.description }}</label>
                                    </div>
                                </li>
                           </ul>
                         
                         </div>
                     </div>
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
                <button class="thm-btn thm-border-btn" data-bs-dismiss="offcanvas" aria-label="Close" ref="agCloseBtn" >Close</button>
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
                resource: 'agents',
                itemForm: 1,
                form_title: "Add Agent",
                item_data: {
                    'name': '',
                    'userid': '',
                    'password': '',
                    'password_confirmation': '',
                    'is_active': 1
                },
                selectedOptions: [], // To store selected checkbox values
                selectdescription: [],
                options: [],
                errorsList: {},
                getAllcategory:[],
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
                            }
                        }
            }
        },
        watch: {
            '$store.state.ag_edit': function () {
                var e_data = this.$store.state.ag_edit
                if(e_data.form_item.categories != undefined){

                    const descriptions = e_data.form_item.categories.map(category => category.description);
                     this.selectdescription= descriptions
                }
                this.setupAgForm(e_data.form_type, e_data.form_item)
            },
            'selectedOptions':function(){
                this.selectdescription =[];
                for(let i = 0 ; i<this.selectedOptions.length;i++){
                    this.selectdescription.push(this.getAllcategory[this.selectedOptions[i]]);
                }
            }
        },
        created(){
                this.category();
        },
        methods: {
            setupAgForm(type, item) {
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
                            'is_active': 1,
                            'form_type': type  // Add
                        }
                        break;
                    case 2: // Setup Edit form Data & requisites
                        this.form_title = "Edit Agents"
                        this.item_data = {
                            'id': item.id,
                            'name': item.name,
                            'userid': item.userid,
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
                    //let new_item_data = this.item_data;
                     this.item_data.category_ids = this.selectedOptions;
                    if(this.item_data.id) {
                        // EDIT & UPDATE
                        axios.post('/'+this.resource+'/update', this.item_data)
                        .then(res => {
                            if(res.data.error == true){  
                                this.$toast.error(res.data.message);
                                this.errorsList = res.data.data;
                            }else{
                                if(this.item_data.form_type == 2) {
                                   this.$store.commit('agent_data_Updated', {'change': 2, 'item':this.item_data});
                                }
                                this.$toast.success(res.data.message);
                                this.$refs.agCloseBtn.click();
                            }
                            this.$store.commit('is_loader', false);
                        }).catch(e => {
                            this.$toast.error(e.response.data.message);
                            this.$store.commit('is_loader', false);
                        })
                    } else {
                        // ADD
                        this.item_data.category_ids = this.selectedOptions;
                        axios.post('/'+this.resource+'/create', this.item_data)
                        .then(res => {
                            if(res.data.error == true){  
                                this.$toast.error(res.data.message);
                                this.errorsList = res.data.data;
                            }else{
                                this.$store.commit('agent_data_Updated', {'change': 1, 'item':res.data});
                                this.$toast.success(res.data.message);
                                this.$refs.agCloseBtn.click();
                            }
                            this.$store.commit('is_loader', false);
                        }).catch(e => {
                            this.$toast.error(e.response.data.message);
                            this.$store.commit('is_loader', false);
                        })
                    }
                }
            },
            category(url = ''){
                if( url != null ) {
                    this.$store.commit('is_loader', true);
                    
                    url = '/'+this.resource+'/get-category';
                    axios.get(url).then(res => {
                        if(res.data.error === true){  
                            this.$toast.error(res.data.message);
                        }else{
                            this.options = res.data.data.details;
                            res.data.data.details.forEach(item => {
                                this.getAllcategory[item.id] = item.description;
                            });
                        }
                        this.$store.commit('is_loader', false);
                    }).catch(e => {
                        this.$toast.error(e.response.data.message);
                        this.$store.commit('is_loader', false);
                    })
                }
            }
        },
    }
    
</script>
<style>


button#dropdownMenuButton1 {
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--body-color);
    color: var(--light-grey-color) !important;
    width: 100%;
    padding: 10px;
    font-size: 13px;
}
.categories-items {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    padding: 10px 8px;
    margin: 4px 0px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
}
.categories-items input {
    width: 14px;
    margin-right: 5px;
    height: 14px;
}
</style>