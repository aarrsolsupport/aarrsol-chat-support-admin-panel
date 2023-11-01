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
                                    <input type="color" class="color-input-item">
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
                                    <input type="color" class="color-input-item">
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
                                    <input type="color" class="color-input-item">
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
                                    <input type="color" class="color-input-item">
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
                                <input class="form-control profit-input d-none" type="file" multiple name="file" id="file"
                                    onchange="javascript:updateList()">
                            </div>
                            <div id="fileList" class="fileList-con"></div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="theme-tab-btn">
                <a href="#" class="thm-btn">Save</a>
            </div>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>