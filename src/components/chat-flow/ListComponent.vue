<template>
    <div class="borad-inner-body">
        <div class="borad-inner-body-con">
            <div class="operator-table-sec chat-flow-tables ">
                <div class="chat-flow-borad-sec">
                    <div class="thm-heading p-2">
                        <h2>Chatbot Flow </h2>
                    </div>
                    <div class="chat-flow-borad-list">
                        <div class="chat-flow-borad-list-con" v-if="!template_id">
                            <div class="chat-flow-item">
                                <button class="chat-flow-btn" @click="setupForm(1)">
                                    <div class="chat-icon">
                                        <img src="@/assets/images/add-message-icon.svg" alt="">
                                    </div>
                                    <div class="chat-flow-con thm-heading  ">
                                        <span class="thm-btn">Add Message</span>
                                        <p>Add a message to be sent to the user by the Bot <br> (Can include Text message /
                                            File or Both) </p>
                                    </div>
                                </button>
                            </div>
                            <div class="chat-flow-item">
                                <button class="chat-flow-btn" @click="setupForm(2)">
                                    <div class="chat-icon">
                                        <img src="@/assets/images/add-option-icon.svg" alt="">
                                    </div>
                                    <div class="chat-flow-con thm-heading  ">
                                        <span class="thm-btn">Add Option</span>
                                        <p>Add a list of Options <br> user can choose from to procced further</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div :class="showForm > 0 ? 'show' : ''" class="add-messag-sec offcanvas" tabindex="-1"
                            id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                            <div class="add-messag-con">
                                <div class="add-messag-header operator-offcanvas-sec">
                                    <div class="thm-heading">
                                        <h4 v-text="showForm == 1 ? 'Add Message' : 'Add Option'"></h4>
                                    </div>
                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                                        aria-label="Close" @click="closeForm"></button>
                                </div>
                                <div class="add-messag-body" v-if="showForm == 1">
                                    <div v-if="showError" class="text-danger">{{ showError }}</div>
                                    <div class="operator-item">
                                        <label for="operator" class="form-label">Message</label>
                                        <textarea type="text" class="form-control" placeholder="Enter Message" rows="3"
                                            v-model="message_data"></textarea>
                                    </div>
                                    <div class="operator-item">
                                        <label for="operator" class="form-label">Upload File</label>
                                        <div class="file-upload-sec">
                                            <label for="file" class="file-upload"> <span><img
                                                        src="@/assets/images/gallery-add.svg" alt=""></span> Choose
                                                File</label>
                                            <input class="form-control profit-input d-none" type="file" name="file" multiple
                                                id="file" @change="uploadFiles">
                                        </div>
                                        <div id="fileList" class="fileList-con">
                                            <ul v-if="uploaded_files.length">
                                                <li v-for="(file, index) in uploaded_files" :key="index"
                                                    :id="'n_file' + index">
                                                    {{ file.name }}
                                                    <span class="list-cross" @click="removeFile(index)"><img
                                                            src="@/assets/images/cross-icon.svg" alt=""></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="add-messag-footer">
                                        <div class="operator-offcanvas-footer ">
                                            <button class="thm-btn thm-border-btn" data-bs-dismiss="offcanvas"
                                                aria-label="Close" @click="closeForm">Close</button>
                                            <button class="thm-btn" @click="saveForm(1)">Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="add-messag-body" v-else>
                                    <div v-if="showError" class="text-danger">{{ showError }}</div>
                                    <div class="operator-item">
                                        <label for="operator" class="form-label">Option</label>
                                        <div class="title-input">
                                            <input type="text" class="form-control" placeholder="Enter Message"
                                                v-model="new_option" />
                                            <button class="thm-btn thm-border-btn title-input-btn" @click="addOption">Save &
                                                Add</button>
                                        </div>
                                        <div id="fileList" class="fileList-con">
                                            <ul v-if="categories_data.length">
                                                <li v-for="(option, index) in categories_data" :key="index">
                                                    {{ option }}
                                                    <span class="list-cross" @click="removeOption(index)"><img
                                                            src="@/assets/images/cross-icon.svg" alt=""></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="add-messag-footer">
                                        <div class="operator-offcanvas-footer ">
                                            <button class="thm-btn thm-border-btn" data-bs-dismiss="offcanvas"
                                                aria-label="Close" @click="closeForm">Close</button>
                                            <button class="thm-btn" @click="saveForm(2)">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
    name: 'ListComponent',
    data() {
        return {
            template_id: 0,
            new_option: '',
            showForm: 0,
            showError: '',
            message_data: '',
            categories_data: [],
            uploaded_files: {}
        }
    },
    computed: {
        ...mapState(['authData'])
    },
    mounted() {
        this.getChatFlow();
    },
    methods: {
        getChatFlow() {
            this.$store.commit('is_loader', true);
            
            axios.post('/chat-flow/get-flow')
            .then(res => {
                this.$store.commit('is_loader', false);
                console.log(['res', res])
                if(res.data.data.template_id) {
                    this.template_id = res.data.data.template_id
                    // TODO
                }
            }).catch(e => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            })
        },
        closeForm() {
            this.showForm = 0;
        },
        setupForm(type) {
            this.showError = '';
            this.showForm = type;
            switch(type) {
                case 1: 
                    this.message_data = '';
                    this.uploaded_files = {};
                    break;
                case 2: 
                    this.new_option = ''
                    this.categories_data = [];
                    break;
            }
        },
        uploadFiles(event) {
            // if(files[i].size >= 2000000){
            //     this.$toast.error('file size should be less than 2 MB');
            // }
            // if(!this.allowedFileTypes.includes(files[i].type)){
            //     this.$toast.error('file type should be jpeg, png, jpg, gif, svg');
            // }
            this.uploaded_files = Array.from(event.target.files);
            console.log(this.uploadFiles)
        },
        removeFile(index) {
            this.uploaded_files.splice(index, 1)
        },
        addOption() {
            if (this.new_option) {
                this.categories_data.push(this.new_option)
                this.new_option = ''
            } else {
                this.showError = "Option can't be empty!";
            }
        },
        removeOption(index) {
            this.categories_data.splice(index, 1)
        },
        saveForm(type) {
            // ADD MESSAGE
            if (type == 1) {
                if (!(this.message_data && this.uploaded_files.length)) {
                    this.showError = 'Please add message or upload a file!'
                } else {
                    this.showError = ''
                }
                this.$store.commit('is_loader', true);
                const form_data = new FormData();
                form_data.append("template_id", this.template_id)
                form_data.append("form_type", type)
                form_data.append("child_node", JSON.stringify({
                    files: this.uploaded_files,
                    message: this.message_data
                }))
                axios.post('/chat-flow/update-default', form_data)
                    .then(res => {
                        this.$store.commit('is_loader', false);
                        // this.closeForm()
                        // TODO update FLOW TREE
                        console.log(res)
                    }).catch(e => {
                        this.$toast.error(e.response.data.message);
                        this.$store.commit('is_loader', false);
                    })
            } else {
            // ADD OPTION
                if (this.categories_data.length < 2) {
                    this.showError = 'Please add at least 2 option!'
                } else {
                    this.showError = ''
                }
                this.$store.commit('is_loader', true);
                axios.post('/chat-flow/update-default', {
                    template_id: this.template_id,
                    form_type: type,
                    child_node: {
                        options: this.categories_data,
                    }
                })
                    .then(res => {
                        this.$store.commit('is_loader', false);
                        // this.closeForm()
                        // TODO update FLOW TREE
                        console.log(res)
                    }).catch(e => {
                        this.$toast.error(e.response.data.message);
                        this.$store.commit('is_loader', false);
                    })
            }
        }
    }
}
</script>