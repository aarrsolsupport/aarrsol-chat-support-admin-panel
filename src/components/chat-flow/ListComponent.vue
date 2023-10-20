<template>
    <div class="borad-inner-body">
        <div class="borad-inner-body-con">
            <div class="operator-table-sec chat-flow-tables ">
                <div class="chat-flow-borad-sec">
                    <div class="thm-heading p-2">
                        <h2>Chatbot Flow </h2>
                    </div>
                    <div class="chat-flow-borad-list">
                        <template v-if="!template_id">
                            <div class="chat-flow-borad-list-con">
                                <div class="chat-flow-item">
                                    <button class="chat-flow-btn" @click="setupForm(1)">
                                        <div class="chat-icon">
                                            <img src="@/assets/images/add-message-icon.svg" alt="">
                                        </div>
                                        <div class="chat-flow-con thm-heading  ">
                                            <span class="thm-btn">Add Message</span>
                                            <p>Add a message to be sent to the user by the Bot <br> (Can include Text
                                                message /
                                                File or Both) </p>
                                        </div>
                                    </button>
                                </div>
                                <!-- <div class="chat-flow-item">
                                    <button class="chat-flow-btn" @click="setupForm(2)">
                                        <div class="chat-icon">
                                            <img src="@/assets/images/add-option-icon.svg" alt="">
                                        </div>
                                        <div class="chat-flow-con thm-heading  ">
                                            <span class="thm-btn">Add Option</span>
                                            <p>Add a list of Options <br> user can choose from to procced further</p>
                                        </div>
                                    </button>
                                </div> -->
                            </div>
                        </template>
                        <template v-else>
                            <blocks-tree :data="treeData" :horizontal="false" :collapsable="true"
                                :props="{ label: 'label', expand: 'expand', children: 'children', key: 'node_id' }"
                                labelClassName="chatFlowNode">
                                <template #node="{ data }">
                                    <!-- , context  -->
                                    <div :class="(showMessageOption == data.node_id && data.node_type == 'C') ? 'node selectedNode category' : ( data.node_type == 'C' ? 'node category' : (showMessageOption == data.node_id ? 'node selectedNode' : 'node'))">
                                        <div class="assistant-sec personal-assistant">
                                            <div class="assistant-item draggable-element">
                                                <div class="assistant-con">
                                                    <div class="move-btn bg-transparent">
                                                        <img src="@/assets/images/move-icon.svg" alt="">
                                                    </div>
                                                    <!-- @click="context.toggleExpand" -->
                                                    <button class="assistant-heading-btn bg-transparent"
                                                        @click="(e)=> showAddOption(data)">
                                                        <div class="thm-heading">
                                                            <p>
                                                                {{ data.label.length > 30 ? data.label.substring(0, 30) + '...' : data.label }} 
                                                            </p>
                                                        </div>
                                                    </button>
                                                    <div class="more-action-sec">
                                                        <button class="more-action-btn" data-bs-toggle="dropdown"><img
                                                                src="@/assets/images/more-action.svg" alt=""></button>
                                                        <ul class="dropdown-menu dropdown-menu-end more-action-list">
                                                            <li>
                                                                <button class="dropdown-item more-list-btn" type="button" @click="setupEditForm(data)">
                                                                    <div class="edit-icon"><img
                                                                            src="@/assets/images/edit-icon.svg" alt="">
                                                                    </div>
                                                                    <div class="thm-heading">
                                                                        <h2>Edit</h2>
                                                                    </div>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="assistant-btn-sec show"
                                            v-if="showMessageOption == data.node_id && data.children.length == 0">
                                            <div class="assistant-btn-con">
                                                <button class="thm-btn" @click="setupForm(1, data)">Add Message</button>
                                                <button class="thm-btn" @click="setupForm(2, data)">Add Option</button>
                                            </div>
                                            <div>
                                                <input type="checkbox" :checked="data.next==2" @change="initiateLiveChat(data)"/>
                                                Live Chat
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </blocks-tree>
                        </template>
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
                                            v-model="new_message"></textarea>
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
import { reactive } from 'vue';

export default {
    setup() {
        let treeData = reactive({});
        const tryAddLeaf = (parentId, tree, childNode) => {
            let isParent = tree.node_id == parentId;
            if(isParent){
                // console.log(['X', parentId, tree, childNode])
                tree.expand = true;
                if(!tree.children) {
                    tree.children = [];
                }
                tree.children.push({
                    children:childNode.children,
                    expand:childNode.expand,
                    files:childNode.files, // *TO-DO*
                    id:childNode.id,
                    node_type:childNode.node_type,
                    label:childNode.label,
                    node_id:childNode.node_id,
                });
            }else if(tree.children){
                tree.children.forEach(ch=> tryAddLeaf(parentId, ch, childNode))
            }
        }

        const deleteNode = (node,tree) => {

            let parent = tree.children ? tree.children.find(p=>p.node_id == node.node_id) : null;
            if(parent){
                tree.children.splice(tree.children.indexOf(node),1)
            }else if(tree.children) {
                tree.children.forEach(ch=> deleteNode(node,ch))
            }


        }

        return {
            treeData,
            tryAddLeaf,
            deleteNode
        }
    },
    name: 'ListComponent',
    data() {
        return {
            template_id: 0,
            showForm: 0,
            showError: '',
            parent_node_data: { type: '', id: 0 },
            new_option: '',
            categories_data: [],
            new_message: '',
            uploaded_files: {},
            showMessageOption: '',
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
                    // console.log(['res', res])
                    if (res.data.data.template_id) {
                        this.template_id = res.data.data.template_id
                        this.treeData = reactive(res.data.data.flow)
                    }
                }).catch(e => {
                    this.$toast.error(e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
        },
        showAddOption(node) {
            this.showMessageOption = (this.showMessageOption == node.node_id) ? '' : node.node_id;
            this.closeForm()
        },
        closeForm() {
            this.showForm = 0;
            this.parent_node_data = { type: '', id: 0 }
        },
        setupEditForm(data) {
            if (data) {
            //     this.showError = '';
            //     this.showForm = data.node_type;
            //     switch (data.node_type) {
            //         case 'C':
            //             this.new_message = data.message;
            //             this.uploaded_files = {}; // *TO-DO*
            //             break;
            //         case 'M':
            //             this.new_option = ''
            //             this.categories_data = [];
            //             break;
            //     }
            }
        },
        setupForm(type, data = {}) {
            if (data) {
                this.parent_node_data = {
                    type: data.node_type,
                    id: data.id
                }
            }
            this.showError = '';
            this.showForm = type;
            switch (type) {
                case 1:
                    this.new_message = '';
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
                    // *TO-DO*
            this.uploaded_files = Array.from(event.target.files);
            // console.log(this.uploadFiles)
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
        initiateLiveChat(node) {
            this.$store.commit('is_loader', true);
            axios.post('/chat-flow/set-next', {
                id: node.id,
                type: node.node_type,
                next: (3 - node.next), //  3-2 = 1 , 3-1 = 2
            })
            .then(() => {
                this.$store.commit('is_loader', false);
                node.next = 3-node.next
            }).catch(e => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            })
        },
        saveForm(type) {
            // ADD MESSAGE
            if (type == 1) {
                if (!(this.new_message && this.uploaded_files.length)) {
                    this.showError = 'Please add message or upload a file!'
                } else {
                    this.showError = ''
                }
                this.$store.commit('is_loader', true);
                const form_data = new FormData();
                form_data.append("template_id", this.template_id)
                form_data.append("form_type", type)
                form_data.append("parent_node", JSON.stringify(this.parent_node_data))
                form_data.append("child_node", JSON.stringify({
                    files: this.uploaded_files, // *TO-DO*
                    message: this.new_message
                }))
                axios.post('/chat-flow/update-default', form_data)
                .then(res => {
                    this.$store.commit('is_loader', false);
                    if(!this.parent_node_data.id) {
                        if (res.data.data.template_id) {
                            this.template_id = res.data.data.template_id
                            this.treeData = reactive(res.data.data.flow)
                        }
                    } else {
                        this.tryAddLeaf((this.parent_node_data.type + '-' + this.parent_node_data.id), this.treeData, res.data.data.node)
                    }
                    this.closeForm()
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
                const form_data = new FormData();
                form_data.append("template_id", this.template_id)
                form_data.append("form_type", type)
                form_data.append("parent_node", JSON.stringify(this.parent_node_data))
                form_data.append("child_node", JSON.stringify({
                    options: this.categories_data,
                }))
                axios.post('/chat-flow/update-default', form_data).then(res => {
                        this.$store.commit('is_loader', false);
                        if(this.parent_node_data.id == 0) {
                            if (res.data.data.template_id) {
                                this.template_id = res.data.data.template_id
                                this.treeData = reactive(res.data.data.flow)
                            }
                        } else {
                            res.data.data.node.forEach(element => {
                                this.tryAddLeaf((this.parent_node_data.type + '-' + this.parent_node_data.id), this.treeData, element)
                            });
                        }
                        this.closeForm()
                    }).catch(e => {
                        this.$toast.error(e.response.data.message);
                        this.$store.commit('is_loader', false);
                    })
            }
        }
    }
}
</script>
<style scoped>
.org-tree-container {
    width: 100%;
    display: flex;
    justify-content: center;
}</style>