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
                                    <p>Are you sure want to mark it <span class="text-uppercase"
                                            v-if="ticket_status[item.status]" :class="(ticket_status[item.status]).theme">{{
                                                (ticket_status[item.status]).text }}</span>?</p>
                                </div>
                            </div>

                            <div class="operator-item">
                                <label for="operator" class="form-label">Remark</label>
                                <textarea class="form-control " placeholder="Enter Here"
                                    aria-autocomplete="list" v-model="remark"></textarea>
                                <span class="text-danger" v-if="required">Please add some remark!</span>
                            </div>

                            <div class="operator-offcanvas-footer pb-0">
                                <button class="thm-btn thm-border-btn grey-bg border-0"
                                    data-bs-dismiss="modal" ref="closeBtn" >Back</button>
                                <button class="thm-btn" @click="updateItemStatus()">Update</button>
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
    props: ['item'],
    computed: {
        ...mapState(['ticket_status']),
    },
    data() {
        return {
            remark: '',
            required: false,
        };
    },
    methods: {
        updateItemStatus() {
            if(this.remark) {
                axios.post("tickets/update-status", {
                    ticket_id: this.item.id,
                    status: this.item.status,
                    remark: this.remark
                }).then(res => {
                    console.log(['res', res])
                    console.log('test',this.listItems)
                    this.remark = '';
                    // *TO-DO* Update LIst / Detail screen
                    this.$toast.success(res.data.message);
                    this.$refs.closeBtn.click();
                    console.log('id', this.item.id,'status',this.item.status);
                    this.$store.commit('ticket_List', {'id': this.item.id, 'status':this.item.status});
                    this.$store.commit('is_loader', false);
                }).catch(e => {
                    this.$toast.error(e.response.data.message);
                    this.$store.commit('is_loader', false);
                })
            } else {
                this.required = true;
            }
        }
    }
}
</script>