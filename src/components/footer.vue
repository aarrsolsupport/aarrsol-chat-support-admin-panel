<template>

    <div class="modal fade cmn-modal delete-item-modal" id="delete-item-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Item</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure delete this item?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                <button type="button" class="btn btn-primary">Yes</button>
            </div>
          </div>
        </div>
    </div>

    <footer class="admin-footer">
      <div class="container">
          <div class="copyright-text">
            © 2023 FantasyCricket. All Rights Reserved.
          </div>
      </div>
    </footer>
 
</template>

<script>
export default {

}
</script>
