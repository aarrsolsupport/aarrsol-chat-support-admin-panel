<template>
    <div class="borad-inner-body-sec">
        <div class="borad-inner-body">
            <div class="borad-inner-body-con">
                <div class="operator-detail-wrapper" v-if="user_id || authData.role_id != 1">
                    <div class="operator-detail-tab">
                        <div class="operator-detail-sec add-more-detail">
                            <ul class="nav nav-pills " id="pills-tab" role="tablist">
                                <li @click="getChatFlow(template.id)" v-for="(template, index) in templates" :key="index"
                                    class="nav-item" role="presentation">
                                    <button class="nav-link" :class="template_id == template.id ? 'active' : ''"
                                        id="pills-chat-flow-tab" data-bs-toggle="pill" data-bs-target="#pills-chat-flow"
                                        type="button" role="tab" aria-controls="pills-chat-flow" aria-selected="true">{{
                                            template.template_name
                                        }}</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <div class="add-more-sec">
                                        <button class="thm-btn thm-border-btn" data-bs-toggle="modal"
                                            data-bs-target="#languagemodal">Add More</button>
                                        <div class="info-sec">
                                            <button class="info-btn bg-transparent" data-bs-toggle="dropdown"
                                                aria-expanded="true"><img src="@/assets/images/info-icon.svg" alt=""></button>
                                            <div class="info-details-con dropdown-menu  " data-popper-placement="bottom-end">
                                                <div class="thm-heading">
                                                    <p>You can add template <br> based on languages.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="operator-table-sec chat-flow-tables ">
                    <div class="chat-flow-borad-sec">
                        <div class="operator-detail-tab-con">
                            <div class="tab-pane fade show" id="pills-chat-flow" role="tabpanel"
                                aria-labelledby="pills-chat-flow-tab">
                                <div class="operator-tab-item-one">
                                    <div class="thm-heading p-2">
                                        <h2>Chatbot Flow {{ template_id }}</h2>
                                    </div>
                                    <div class="chat-flow-borad-list">
                                        <template v-if="!template_id">
                                            <div class="chat-flow-borad-list-con">
                                                <div class="chat-flow-item">
                                                    <button class="chat-flow-btn" @click="setupForm(1)" data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal">
                                                        <div class="chat-icon">
                                                            <img src="@/assets/images/add-message-icon.svg" alt="">
                                                        </div>
                                                        <div class="chat-flow-con thm-heading  ">
                                                            <span class="thm-btn">Add Message</span>
                                                            <p>Add a message to be sent to the user by the Bot <br> (Can include
                                                                Text
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
                                                    <div
                                                        :class="(showMessageOption == data.node_id && data.node_type == 'C') ? 'node selectedNode category' : (data.node_type == 'C' ? 'node category' : (showMessageOption == data.node_id ? 'node selectedNode' : 'node'))">
                                                        <div class="assistant-sec personal-assistant">
                                                            <div class="assistant-item draggable-element">
                                                                <div class="assistant-con">
                                                                    <div class="move-btn bg-transparent">
                                                                        <img src="@/assets/images/move-icon.svg" alt="">
                                                                    </div>
                                                                    <!-- @click="context.toggleExpand" -->
                                                                    <button class="assistant-heading-btn bg-transparent"
                                                                        @click="(e) => showAddOption(data)">
                                                                        <div class="thm-heading">
                                                                            <p :title="data.label">
                                                                                {{ data.node_id }}
                                                                                {{ data.label.length > 30 ?
                                                                                    data.label.substring(0, 30) +
                                                                                    '...' : data.label }}
                                                                            </p>
                                                                        </div>
                                                                    </button>
                                                                    <div class="more-action-sec">
                                                                        <button class="more-action-btn"
                                                                            data-bs-toggle="dropdown"><img
                                                                                src="@/assets/images/more-action.svg"
                                                                                alt=""></button>
                                                                        <ul
                                                                            class="dropdown-menu dropdown-menu-end more-action-list">
                                                                            <li>
                                                                                <button class="dropdown-item more-list-btn"
                                                                                    type="button" @click="setupEditForm(data)">
                                                                                    <div class="edit-icon"><img
                                                                                            src="@/assets/images/edit-icon.svg"
                                                                                            alt="">
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
                                                                <button class="thm-btn" @click="setupForm(1, data)" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Message</button>
                                                                <button class="thm-btn" @click="setupForm(2, data)" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Option</button>
                                                            </div>
                                                            <div>
                                                                <input type="checkbox" :checked="data.next == 2"
                                                                    @change="initiateLiveChat(data)" />
                                                                Live Chat
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </blocks-tree>
                                        </template>
                                        <div :class="showForm > 0 ? 'show' : ''" class="modal add-option-sec" tabindex="-1"
                                            id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="add-messag-con">
                                                        <div class="add-messag-header add-operator-header operator-offcanvas-sec"
                                                            style="content: none;">
                                                            <div class="thm-heading">
                                                                <h4 v-text="showForm == 1 ? 'Add Message' : 'Add Option'"></h4>
                                                            </div>
                                                            <button type="button" class="btn-close text-reset"
                                                                data-bs-dismiss="modal" aria-label="Close"
                                                                @click="closeForm"></button>
                                                        </div>
                                                        <div class="add-messag-body" v-if="showForm == 1">
                                                            <div v-if="showError" class="text-danger">{{ showError }}</div>
                                                            <div class="operator-item">
                                                                <label for="operator" class="form-label">Message</label>
                                                                <textarea type="text" class="form-control"
                                                                    placeholder="Enter Message" rows="3"
                                                                    v-model="new_message"></textarea>
                                                            </div>
                                                            <div class="operator-item">
                                                                <label for="operator" class="form-label">Upload File</label>
                                                                <div class="file-upload-sec">
                                                                    <label for="file" class="file-upload"> <span><img
                                                                                src="@/assets/images/gallery-add.svg"
                                                                                alt=""></span>
                                                                        Choose
                                                                        File</label>
                                                                    <input class="form-control profit-input d-none" type="file"
                                                                        name="file" multiple id="file" @change="uploadFiles">
                                                                </div>
                                                                <div id="fileList" class="fileList-con">
                                                                    <ul v-if="uploaded_files.length">
                                                                        <li v-for="(file, index) in uploaded_files" :key="index"
                                                                            :id="'n_file' + index">
                                                                            {{ file.name }}
                                                                            <span class="list-cross"
                                                                                @click="removeFile(index)"><img
                                                                                    src="@/assets/images/cross-icon.svg"
                                                                                    alt=""></span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="add-messag-footer">
                                                                <div class="operator-offcanvas-footer ">
                                                                    <button class="thm-btn thm-border-btn"
                                                                        data-bs-dismiss="modal" aria-label="Close"
                                                                        @click="closeForm" ref="msgOptnBtn">Close</button>
                                                                    <button class="thm-btn" @click="saveForm(1)">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="add-messag-body" v-else-if="showForm == 2">
                                                            <div v-if="showError" class="text-danger">{{ showError }}</div>
                                                            <div class="operator-item">
                                                                <label for="operator" class="form-label">Option</label>
                                                                <div class="title-input">
                                                                    <input type="text" class="form-control"
                                                                        placeholder="Enter Message" v-model="new_option" />
                                                                    <button class="thm-btn thm-border-btn title-input-btn"
                                                                        @click="addOption">Save &
                                                                        Add</button>
                                                                </div>
                                                                <div id="fileList" class="fileList-con">
                                                                    <ul v-if="categories_data.length">
                                                                        <li v-for="(option, index) in categories_data"
                                                                            :key="index">
                                                                            {{ option }}
                                                                            <span class="list-cross"
                                                                                @click="removeOption(index)"><img
                                                                                    src="@/assets/images/cross-icon.svg"
                                                                                    alt=""></span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="add-messag-footer">
                                                                <div class="operator-offcanvas-footer ">
                                                                    <button class="thm-btn thm-border-btn"
                                                                        data-bs-dismiss="modal" aria-label="Close"
                                                                        @click="closeForm" ref="msgOptnBtn">Close</button>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="languagemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered status-popup-modal language-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="thm-heading">
                            <h4>Template Details</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="status-popup-sec">
                            <div class="status-popup-con">
                                <div class="operator-item">
                                    <label for="operator" class="form-label">Language</label>
                                    <select class="form-select" aria-label="Default select example"
                                        v-model="new_template.language_id" @change="addTitle">
                                        <option value=0>--Select--</option>
                                        <option v-for="(title, i) in languages" :key="i" :value="i">{{ title }}</option>
                                    </select>
                                </div>
                                <div class="operator-item">
                                    <label for="operator" class="form-label">Title</label>
                                    <input type="text" class="form-control " placeholder="Enter Here" aria-autocomplete="list"
                                        v-model="new_template.template_name">
                                </div>
                                <div class="operator-offcanvas-footer pb-0">
                                    <button class="thm-btn thm-border-btn grey-bg border-0" data-bs-dismiss="modal"
                                        ref='closeLangBtn'>Back</button>
                                    <button class="thm-btn" @click="saveTemplateDetails">Save</button>
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
    name: 'ListComponent',
    props: ['user_id'],
    setup() {
        let treeData = reactive({});

        const tryAddLeaf = (parentId, tree, childNode) => {
            let isParent = tree.node_id == parentId;
            if (isParent) {
                tree.expand = true;
                if (!tree.children) {
                    tree.children = [];
                }
                tree.children.push({
                    children: childNode.children,
                    expand: childNode.expand,
                    files: childNode.files, // *TO-DO*
                    id: childNode.id,
                    node_type: childNode.node_type,
                    label: childNode.label,
                    node_id: childNode.node_id,
                });
            } else if (tree.children) {
                tree.children.forEach(ch => tryAddLeaf(parentId, ch, childNode))
            }
        }

        const deleteNode = (node, tree) => {

            let parent = tree.children ? tree.children.find(p => p.node_id == node.node_id) : null;
            if (parent) {
                tree.children.splice(tree.children.indexOf(node), 1)
            } else if (tree.children) {
                tree.children.forEach(ch => deleteNode(node, ch))
            }
        }

        const resetTreeData = (newTree) => {
            Object.assign(treeData, newTree)
        }

        return {
            treeData,
            tryAddLeaf,
            deleteNode,
            resetTreeData
        }
    },
    data() {
        return {
            templates: [
                { flow: {} }
            ],
            template_id: 0,
            showForm: 0,
            showError: '',
            edit_node_id: 0,
            parent_node_data: { type: '', id: 0 },
            new_option: '',
            categories_data: [],
            new_message: '',
            uploaded_files: {},
            showMessageOption: '',
            languages: {
                1: 'English',
                2: 'Hindi',
                3: 'Siamese',
            },
            new_template: {
                language_id: 0
            }
        }
    },
    computed: {
        ...mapState(['authData'])
    },
    mounted() {
        this.getChatTemplates();
    },
    methods: {
        addTitle() {
            this.new_template.template_name = this.new_template.language_id == 0 ? '' : this.languages[this.new_template.language_id]
        },
        saveTemplateDetails() {
            this.$store.commit('is_loader', true);
            axios.post('/chat-flow/update-template-details', this.new_template)
                .then(res => {
                    // Add New Template
                    if (res.data.data.template_id) {
                        this.templates.push(res.data.data)
                        this.template_id = res.data.data.template_id
                        this.resetTreeData(res.data.data.flow)
                    } else {
                        // *TO-DO* if updating existing template details 
                    }
                    this.$store.commit('is_loader', false);
                    this.$toast.success(res.data.message);
                    this.$refs.closeLangBtn.click()
                }).catch(e => {
                    console.error(e)
                    this.$toast.error(e.response.message ?? e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
        },
        getChatTemplates() {
            this.$store.commit('is_loader', true);
            axios.post('/chat-flow/get-chat-templates', { userid: this.user_id })
                .then(res => {
                    this.$store.commit('is_loader', false);
                    if (res.data.data.templates) {
                        this.templates = res.data.data.templates
                        this.template_id = res.data.data.default.template_id
                        this.resetTreeData(res.data.data.default.flow)
                    }
                }).catch(e => {
                    console.error(e)
                    this.$toast.error(e.response.message ?? e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
        },
        getChatFlow(template_id = 0) {
            if (this.template_id != template_id) {
                this.$store.commit('is_loader', true);
                axios.post('/chat-flow/get-flow', { template_id: template_id })
                    .then(res => {
                        this.$store.commit('is_loader', false);
                        if (res.data.data.template_id) {
                            this.template_id = res.data.data.template_id
                            this.resetTreeData(res.data.data.flow)
                        }
                    }).catch(e => {
                        this.$toast.error(e.response.message ?? e.response.data.message);
                        this.$store.commit('is_loader', false);
                    })
            }
        },
        showAddOption(node) {
            this.showMessageOption = (this.showMessageOption == node.node_id) ? '' : node.node_id;
            // this.closeForm()
        },
        closeForm() {
            this.parent_node_data = { type: '', id: 0 }
            this.$refs.msgOptnBtn.click()
            // this.showForm = 0;
        },
        setupEditForm(data) {
            // *TO-DO*
            if (data) {
                this.showError = '';
                switch (data.node_type) {
                    case 'C':
                        this.showForm = 2;
                        // this.new_option = ''
                        // this.categories_data = [];
                        console.log([data, this.showForm]);
                        break;
                    case 'M':
                        this.showForm = 1;
                        this.new_message = data.label;
                        this.edit_node_id = data.id;
                        // this.uploaded_files = {}; // *TO-DO*
                        break;
                }
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
                    node.next = 3 - node.next
                }).catch(e => {
                    this.$toast.error(e.response.message ?? e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
        },
        saveForm(type) {
            // ADD MESSAGE
            if (type == 1) {
                if (!(this.new_message || this.uploaded_files.length)) {
                    this.showError = 'Please add message or upload a file!'
                } else {
                    this.showError = ''
                    this.$store.commit('is_loader', true);
                    const form_data = new FormData();
                    form_data.append("template_id", this.template_id ? this.template_id : 0)
                    form_data.append("form_type", type)
                    form_data.append("parent_node", JSON.stringify(this.parent_node_data))
                    form_data.append("child_node", JSON.stringify({
                        files: this.uploaded_files, // *TO-DO*
                        message: this.new_message,
                        id: this.edit_node_id
                    }))
                    axios.post('/chat-flow/update-default', form_data)
                        .then(res => {
                            this.$store.commit('is_loader', false);
                            console.log([
                                !this.parent_node_data.id,
                                this.edit_node_id,
                                res
                            ])
                            if (!this.parent_node_data.id) {
                                if (res.data.data.template_id) {
                                    this.template_id = res.data.data.template_id
                                    this.resetTreeData(res.data.data.flow)
                                }
                            } else {
                                if (this.edit_node_id) {
                                    // TODO find Node & Update text
                                } else {
                                    this.tryAddLeaf((this.parent_node_data.type + '-' + this.parent_node_data.id), this.treeData, res.data.data.node)
                                }
                            }
                            this.closeForm()
                        }).catch(e => {
                        console.error(e)
                            // this.$toast.error(e.response.message ?? e.response.data.message);
                            this.$store.commit('is_loader', false);
                        })
                }
            } else {
                // ADD OPTION
                if (this.categories_data.length < 2) {
                    this.showError = 'Please add at least 2 option!'
                } else {
                    this.showError = ''
                    this.$store.commit('is_loader', true);
                    const form_data = new FormData();
                    form_data.append("template_id", this.template_id ? this.template_id : 0)
                    form_data.append("form_type", type)
                    form_data.append("parent_node", JSON.stringify(this.parent_node_data))
                    form_data.append("child_node", JSON.stringify({
                        options: this.categories_data,
                    }))
                    axios.post('/chat-flow/update-default', form_data).then(res => {
                        this.$store.commit('is_loader', false);
                        if (this.parent_node_data.id == 0) {
                            if (res.data.data.template_id) {
                                this.template_id = res.data.data.template_id
                                this.resetTreeData(res.data.data.flow)
                            }
                        } else {
                            res.data.data.node.forEach(element => {
                                this.tryAddLeaf((this.parent_node_data.type + '-' + this.parent_node_data.id), this.treeData, element)
                            });
                        }
                        this.closeForm()
                    }).catch(e => {
                        console.error(e)
                        // this.$toast.error(e.response.message ?? e.response.data.message);
                        this.$store.commit('is_loader', false);
                    })
                }
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
}

.operator-tab-item-one {
    padding: 0px;
}

.operator-tab-item-one .borad-inner-body {
    margin-top: 0px;
}

.operator-tab-item-one .borad-inner-body .operator-table-sec {
    margin-top: 0px;
}

.operator-tab-item-one .operator-table-sec {
    margin: 0px -18px;
}

.add-messag-header::before {
    display: none;
}
</style>