<template>
    <!-- Tickets Update Status modal -->
    <div class="modal fade" id="statusdetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered status-popup-modal">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="status-popup-sec">
                        <div class="status-popup-con">

                            <div class="menu-item-con">
                                <div class="menu-item-img header-admin-btn">
                                    <img src="@/assets/images/shield-tick.svg" alt="">
                                </div>
                                <div class="thm-heading">
                                    <p>Are you sure want to delete it ?</p>
                                </div>
                            </div>

                            <div class="operator-offcanvas-footer pb-0">
                                <button class="thm-btn thm-border-btn grey-bg border-0" data-bs-dismiss="modal"
                                    ref="closeBtn">Back</button>
                                <button class="thm-btn" @click="updateItemStatus()">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import axios from "axios"
export default {
    name: 'UpdateComponent',
    props: ['nodeData', 'template_id'],
    data() {
        return {
            required: false,
        };
    },
    methods: {
        updateItemStatus() {
                axios.post("chat-flow/delete-node", {
                    child_node: {
                        node_type: this.nodeData.node_type == 'M' ? 1 : 2,
                        id: this.nodeData.id
                    },
                    parent_node: {
                        id: this.nodeData.parent.id,
                        node_type: this.nodeData.parent.type == 'M' ? 1 : 2
                    },
                    template_id: this.template_id
                }).then(res => {
                    this.remark = '';
                    this.$toast.success(res.data.message);
                    this.$refs.closeBtn.click();
                    this.$emit('refreshTree')
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.$toast.error(e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
        }
    }
}
</script>