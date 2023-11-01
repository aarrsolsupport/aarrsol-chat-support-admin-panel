<template>
    <div class="theme-tab-list-con">
        <div id="pills-tabContent">


            <div class="theme-tab-form">
                <div class="row">

                    <div class="col-lg-4 col-md-6 col-sm-6  ">
                        <div class="operator-item">
                            <label for="operator" class="form-label">Header Color</label>
                            <div class="operator-item-sec">
                                <input type="text" class="form-control" placeholder="Enter Name">
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
                                <input type="text" class="form-control" placeholder="Enter Name">
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
                                <input type="text" class="form-control" placeholder="Enter Name">
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
                                <input type="text" class="form-control" placeholder="Enter Name">
                                <div class="color-input">
                                    <input type="color" class="color-input-item" v-model="themeColors.background_color">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 col-sm-6  ">
                        <div class="operator-item">
                            <label for="operator" class="form-label">Upload File</label>
                            <div class="file-upload-sec">
                                <label for="file" class="file-upload"> <span><img src="@/assets/images/gallery-add.svg"
                                            alt=""></span> Choose File</label>
                                <input class="form-control profit-input d-none" type="file" name="file" id="file"
                                    @change="uploadLogoImg">
                            </div>
                            <div id="fileList" class="fileList-con"></div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="theme-tab-btn">
                <a href="Javascript:void(0);" class="thm-btn" @click="setThemeSettings()">Save</a>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ThemeSettingListComponent',
    data() {
        return {
            resource: 'white-labels',
            themeColors: {},
            themeLogoFile: null
        }
    },
    mounted() {
        this.getThemeSettings();
    },
    methods: {
        getThemeSettings() {
            this.$store.commit('is_loader', true);
            let url = '/' + this.resource + '/get-theme-settings';
            axios.get(url).then(res => {
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                    let themeData = res.data.data.settings
                    for (let i = 0; i < themeData.length; i++) {
                        this.themeColors[themeData[i].label] = themeData[i].value
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
            let url = '/' + this.resource + '/update-theme-settings';

            let data = {};
            Object.keys(this.themeColors).forEach((key) => {
                data[key] = this.themeColors[key]
            });

            let themeSettings = new FormData();
            themeSettings.append('settings', JSON.stringify(data))
            this.themeLogoFile ? themeSettings.append('settings', this.themeLogoFile) : null

            axios.post(url, themeSettings).then(res => {
                if (res.data.error === true) {
                    this.$toast.error(res.data.message);
                } else {
                    this.$toast.success(res.data.message);
                }
                this.$store.commit('is_loader', false);
            }).catch(e => {
                this.$toast.error(e.response.data.message);
                this.$store.commit('is_loader', false);
            })
        },
        uploadLogoImg(event) {
            this.themeLogoFile = event.target.files[0];
        }
    }

}
</script>

<style></style>