<template>
    <div class="borad-inner-body-sec">
        <div class="borad-inner-body">
            <div class="borad-inner-body-con">
                <div class="theme-sec">
                    <div class="theme-tab-list-con">
                        <div id="pills-tabContent">
                            <div class="theme-tab-form">
                                <div class="row">
                                    <div class="col-lg-4 col-md-6 col-sm-6  ">
                                        <div class="operator-item">
                                            <label for="operator" class="form-label">Header Color</label>
                                            <div class="operator-item-sec">
                                                <input type="text" class="form-control" placeholder="Select">
                                                <div class="color-input">
                                                    <input type="color" class="color-input-item" v-model="themeColors.header_color">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6  ">
                                        <div class="operator-item">
                                            <label for="operator" class="form-label">Footer Color</label>
                                            <div class="operator-item-sec">
                                                <input type="text" class="form-control" placeholder="Select">
                                                <div class="color-input">
                                                    <input type="color" class="color-input-item" v-model="themeColors.footer_color">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6  ">
                                        <div class="operator-item">
                                            <label for="operator" class="form-label">Text color</label>
                                            <div class="operator-item-sec">
                                                <input type="text" class="form-control" placeholder="Select">
                                                <div class="color-input">
                                                    <input type="color" class="color-input-item" v-model="themeColors.text_color">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6  ">
                                        <div class="operator-item">
                                            <label for="operator" class="form-label">Background Color</label>
                                            <div class="operator-item-sec">
                                                <input type="text" class="form-control" placeholder="Select">
                                                <div class="color-input">
                                                    <input type="color" class="color-input-item"
                                                        v-model="themeColors.background_color">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6  ">
                                        <div class="operator-item">
                                            <label for="operator" class="form-label">Upload File</label>
                                            <div class="file-upload-sec">
                                                <label for="file" class="file-upload"> <span><img
                                                            src="@/assets/images/gallery-add.svg" alt=""></span> Choose
                                                    File</label>
                                                <input class="form-control profit-input d-none" type="file" name="file"
                                                    id="file" @change="uploadLogoImg">
                                            </div>
                                            <div id="fileList" class="fileList-con" v-if="themeLogoFileName">
                                                <ul>
                                                    <li>{{ themeLogoFileName }}
                                                        <span class="list-cross" @click="this.themeLogoFileName = null"><img
                                                                src="@/assets/images/cross-icon.svg" alt=""></span>
                                                        <span class="media-display" v-if="!themeLogoFile">
                                                            <img :src="mediaBaseUrl + themeLogoFileName">
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="theme-tab-btn">
                                <a href="Javascript:void(0);" class="thm-btn" @click="setThemeSettings()">Save</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ThemeSettingListComponent',
    props: ['whitelabel_id'],
    data() {
        return {
            resource: 'white-labels',
            themeColors: {},
            themeLogoFile: null,
            themeLogoFileName: null,
            mediaBaseUrl: null
        }
    },
    mounted() {
        this.getThemeSettings();
    },
    methods: {
        getThemeSettings() {
            this.$store.commit('is_loader', true);
            let url = '/' + this.resource + '/get-theme-settings';
            if (this.whitelabel_id) {
                url += '?whitelabel_id=' + this.whitelabel_id;
            }
            axios.get(url).then(res => {
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                    let themeData = res.data.data.settings
                    this.mediaBaseUrl = res.data.data.media_base_url;
                    for (let i = 0; i < themeData.length; i++) {
                        if (themeData[i].label == 'logo') {
                            this.themeLogoFileName = themeData[i].value
                        } else {
                            this.themeColors[themeData[i].label] = themeData[i].value
                        }
                    }
                }
                this.$store.commit('is_loader', false);
            }).catch(e => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            })
        },
        setThemeSettings() {
            this.$store.commit('is_loader', true);

            const data = {};
            Object.keys(this.themeColors).forEach((key) => {
                data[key] = this.themeColors[key];
            });

            if (!Object.keys(data).length) {
                this.$store.commit('is_loader', false);
                this.$toast.warning('Nothing to update!');
                return;
            }

            const themeSettings = new FormData();
            themeSettings.append('settings', JSON.stringify(data));

            if (this.themeLogoFile) {
                themeSettings.append('logo', this.themeLogoFile);
            }

            if (this.whitelabel_id) {
                themeSettings.append('whitelabel_id', this.whitelabel_id);
            }

            const url = `/${this.resource}/update-theme-settings`;
            axios.post(url, themeSettings).then((res) => {
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                    const themeData = res.data.data.settings;
                    for (let i = 0; i < themeData.length; i++) {
                        if (themeData[i].label === 'logo') {
                            this.themeLogoFileName = themeData[i].value;
                        } else {
                            this.themeColors[themeData[i].label] = themeData[i].value;
                        }
                    }
                    this.themeLogoFile = null;
                    this.$toast.success(res.data.message);
                }
                this.$store.commit('is_loader', false);
            }).catch((e) => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            });
        },
        uploadLogoImg(event) {
            this.themeLogoFile = event.target.files[0];
            this.themeLogoFileName = event.target.files[0].name;
        }
    }

}
</script>