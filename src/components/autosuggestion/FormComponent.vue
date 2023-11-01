<template>
    <!--Operator offcanvas-->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="agentoffcanvas" data-bs-keyboard="false"
        aria-labelledby="agentoffcanvasLabel" data-bs-backdrop="static">
        <div class="offcanvas-header operator-offcanvas-sec">
            <div class="thm-heading">
                <h4>{{ updateData?.is_update ? 'Edit Suggestions' : form_title }}</h4>
            </div>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"
                @click="clearDataCloseCanvas()"></button>
        </div>
        <div class="offcanvas-body operator-offcanvas-body add-messag-body add-now-sec">
            <div class="operator-offcanvas-con">
                <form>
                    <div class="operator-item">
                        <label for="operator" class="form-label">Message</label>
                        <textarea class="form-control border" id="exampleFormControlTextarea1" rows="3"
                            placeholder="Enter description" v-model="item_data.description"
                            :class="v$.item_data.description?.$error ? 'border-danger' : 'border-0'"></textarea>
                        <ul class="list-unstyled" v-if="errorsList">
                            <li v-for="(err, e) in errorsList" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                    <div class="operator-item">
                        <label for="operator" class="form-label">Upload Media</label>
                        <div class="file-upload-sec">
                            <label for="file" class="file-upload"> <span><img src="@/assets/images/gallery-add.svg"
                                        alt=""></span> Choose File</label>
                            <input class="form-control profit-input d-none" type="file" name="file" multiple id="file"
                                @change="Uploadfilemedia">
                        </div>
                        <div id="fileList" class="fileList-con" v-if="item_data.media">
                            <ul>
                                <li v-for="(items, index) in updateMediaName" :key="index">{{ items }}
                                    <span class="list-cross" @click="removeMediaFile(index)"><img
                                            src="@/assets/images/cross-icon.svg" alt=""></span>
                                    <span class="media-display">
                                        <img :src="mediaBaseUrl + items">
                                    </span>
                                </li>
                                <li v-for="(items, index) in item_data.media" :key="index">{{ items.name }}
                                    <span class="list-cross" @click="removeUpdatedMediaFile(index)"><img
                                            src="@/assets/images/cross-icon.svg" alt=""></span>
                                </li>
                            </ul>
                        </div>
                        <ul class="list-unstyled" v-if="errorsList && errorsList.description">
                            <li v-for="(err, e) in errorsList.description" :key="e" class="text-danger">{{ err }}</li>
                        </ul>
                    </div>

                </form>
            </div>
            <div class="operator-offcanvas-footer">
                <button class="thm-btn thm-border-btn" data-bs-dismiss="offcanvas" aria-label="Close" ref="agCloseBtn"
                    @click="clearDataCloseCanvas()">Close</button>
                <button type="button" class="thm-btn" @click="saveItem()">Save</button>
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
    props: ['updateData'],
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            resource: 'auto-suggestions',
            itemForm: 1,
            form_title: "Add Now",
            item_data: {
                'description': '',
                'media': null,
            },
            errorsList: {},
            getAllcategory: [],
            removedMedia: [],
            updateMediaName: [],
            mediaBaseUrl: ''
        }
    },
    validations() {
        return {
            item_data: {
                description: { required },
            }
        }
    },
    methods: {
        addupdateData() {
            this.v$.$reset();
            this.item_data = {
                description: this.updateData.description,
                media: [],
                id: this.updateData.id
            }
            this.mediaBaseUrl = this.updateData.mediaBaseUrl
            this.updateMediaName = this.updateData.file_paths
        },
        saveItem() {
            this.v$.$touch()
            if (this.v$.$error) {
                return false
            } else {
                this.$store.commit('is_loader', true);
                if (this.item_data.id) {
                    // EDIT & UPDATE

                    let updateSuggestion = new FormData();
                    updateSuggestion.append('description', this.item_data.description);
                    updateSuggestion.append('id', this.item_data.id);
                    for (let i = 0; i < this.item_data.media.length; i++) {
                        updateSuggestion.append('file[]', this.item_data.media[i]);
                    }
                    for (let i = 0; i < this.removedMedia.length; i++) {
                        updateSuggestion.append('deleted_files[]', this.removedMedia[i]);
                    }

                    axios.post('/' + this.resource + '/update', updateSuggestion)
                        .then(res => {
                            if (res.data.error == true) {
                                this.$toast.error(res.data.message);
                                this.errorsList = res.data.data;
                            } else {
                                if (this.item_data.form_type == 2) {
                                    this.$store.commit('agent_data_Updated', { 'change': 2, 'item': this.item_data });
                                }
                                this.$emit('updatedSuggestionList');
                                this.$toast.success(res.data.message);
                                this.clearDataCloseCanvas()
                            }
                            this.$store.commit('is_loader', false);
                        }).catch(e => {
                            this.$toast.error(e.response.data.message);
                            this.$store.commit('is_loader', false);
                        })
                } else {
                    // ADD
                    let data = {
                        form_type: 1,
                        description: this.item_data.description
                    }
                    let createSuggestion = new FormData();
                    createSuggestion.append('from_type', 1);
                    createSuggestion.append('description', this.item_data.description);
                    for (let i = 0; i < this.item_data.media.length; i++) {
                        createSuggestion.append('file[]', this.item_data.media[i]);
                    }

                    axios.post('/' + this.resource + '/create', createSuggestion)
                        .then(res => {
                            if (res.data.error == true) {
                                this.$toast.error(res.data.message);
                                this.errorsList = res.data.data;
                            } else {
                                this.$emit('updatedSuggestionList');
                                this.$toast.success(res.data.message);
                                this.clearDataCloseCanvas();
                            }
                            this.$store.commit('is_loader', false);
                        }).catch(e => {
                            this.$toast.error(e.response.data.message);
                            this.$store.commit('is_loader', false);
                        })
                }
            }
        },
        Uploadfilemedia(event) {
            this.item_data.media = [];
            let mediaFiles = event.target.files;
            for (let i = 0; i < mediaFiles.length; i++) {
                this.item_data.media.push(mediaFiles[i]);
            }
        },
        clearDataCloseCanvas() {
            this.$refs.agCloseBtn.click();
            this.item_data = {
                'description': '',
                'media': '',
            }
            this.removedMedia = [];
            this.$parent.updateData = null;
            this.v$.$reset();
        },
        removeMediaFile(position) {
            if (this.updateData.is_update) {
                this.removedMedia.push(this.updateMediaName[position])
            }
            this.updateMediaName.splice(position, 1)
        },
        removeUpdatedMediaFile(position) {
            this.item_data.media.splice(position, 1);
        }
    },
    watch: {
        updateData() {
            if (this.updateData) {
                this.addupdateData();
            }
        },
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

.media-display {
    display: block;
    max-width: 100px;
}
</style>