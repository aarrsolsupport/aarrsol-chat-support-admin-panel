<template>
   <div class="borad-inner-body-sec">
      <div class="borad-inner-body">
         <div class="dashboard-list-sec">
            <div class="row">
                  <h1 class="text-primary">*TO-DO*</h1>
               <div class="col-lg-3 col-md-6 col-sm-6">
                  <div class="dashboard-list-con">
                     <div class="dashboard-item">
                        <div class="thm-heading">
                           <h4>65</h4>
                           <span>Total Operator</span>
                        </div>
                     </div>
                     <div class="ashboard-item-img">
                        <img src="@/assets/images/total-operator-icon.svg" alt="">
                     </div>
                  </div>
               </div>

               <div class="col-lg-3 col-md-6 col-sm-6">
                  <div class="dashboard-list-con">
                     <div class="dashboard-item">
                        <div class="thm-heading">
                           <h4>50</h4>
                           <span>Active Operator</span>
                        </div>
                     </div>
                     <div class="ashboard-item-img">
                        <img src="@/assets/images/total-operator-icon.svg" alt="">
                     </div>
                  </div>
               </div>

               <div class="col-lg-3 col-md-6 col-sm-6">
                  <div class="dashboard-list-con">
                     <div class="dashboard-item">
                        <div class="thm-heading">
                           <h4>125</h4>
                           <span>Resolved Tickets</span>
                        </div>
                     </div>
                     <div class="ashboard-item-img">
                        <img src="@/assets/images/resolved-tickets-icon.svg" alt="">
                     </div>
                  </div>
               </div>

               <div class="col-lg-3 col-md-6 col-sm-6">
                  <div class="dashboard-list-con">
                     <div class="dashboard-item">
                        <div class="thm-heading">
                           <h4>108</h4>
                           <span>Unresolved Tickets</span>
                        </div>
                     </div>
                     <div class="ashboard-item-img">
                        <img src="@/assets/images/resolved-tickets-icon.svg" alt="">
                     </div>
                  </div>
               </div>

               <div class="col-lg-3 col-md-6 col-sm-6">
                  <div class="dashboard-list-con">
                     <div class="dashboard-item">
                        <div class="thm-heading">
                           <h4>20</h4>
                           <span>Ticket to Review</span>
                        </div>
                     </div>
                     <div class="ashboard-item-img">
                        <img src="@/assets/images/resolved-tickets-icon.svg" alt="">
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   export default {
      name: 'DashboardComponent'
   }
</script>