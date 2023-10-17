<template>
   <header class="header-wrapper">
      <div class="container-fluid">
         <div class="header-sec justify-content-center">
            <div class="header-logo">
               <a href="#">
                  <img src="@/assets/images/logo-img.svg" alt="">
               </a>
            </div>
         </div>
      </div>
   </header>
   <section class="login-wrapper">
      <div class="container-fluid">
         <div class="login-sec">
            <div class="login-con">
               <div class="row align-items-center">
                  <div class="col-lg-6 col-md-6 ">
                     <div class="login-con-item">
                        <div class="login-item-img">
                           <img src="@/assets/images/login-form-bg.jpg" alt="">
                        </div>
                     </div>
                  </div>
                  <div class="col-lg-6 col-md-6  ">
                     <div class="login-con-item">
                        <div class="login-form-con">
                           <div class="thm-heading text-center">
                              <h4>Welcome Back!</h4>
                           </div>
                           <div class="operator-offcanvas-con">
                              <form autocomplete="off" id="login-form">
                                 <div class="alert alert-danger p-2 mt-3" v-if="error_message">
                                    <small>{{ error_message }}</small>
                                    <span class="close" @click="error_message = ''">x</span>
                                 </div>
                                 <div class="operator-item">
                                    <label for="operator" class="form-label" :class="v$.userid.$error ? 'text-danger' : ''">User ID<small v-if="v$.userid.$error"> Required!</small>
                                    </label>
                                    <input type="text" v-model="userid" class="form-control" :class="v$.userid.$error ? 'border border-danger' : ''" placeholder="User ID">
                                 </div>
               
                                 <div class="operator-item">
                                    <label for="login" class="form-label" :class="v$.password.$error ? 'text-danger' : ''">Password<small v-if="v$.userid.$error"> Required!</small></label>
                                    <input type="password" v-model="password" class="form-control" :class="v$.userid.$error ? 'border border-danger' : ''" placeholder="Password">
                                 </div>
                                    
                                 <div class="remember-forgot-sec">
                                    <div class="form-check remember-sec">
                                       <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                       <label class="form-check-label" for="flexCheckDefault">
                                          Remember
                                       </label>
                                       </div>
                                       <div class="forgot-sec">
                                       <a href="#" >Forgot Password?</a>
                                       </div>
                                 </div>

                                 <div class="form-footer">
                                    <button type="button" class="thm-btn w-100" @click="login">Login</button>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script>
   import { required } from '@vuelidate/validators'
   import { useVuelidate } from '@vuelidate/core'
   import axios from "axios"

   export default {
      name: 'LoginComponent',
      setup () {
         return { v$: useVuelidate() }
      },
      validations:{
         userid:{required},
         password:{required},
      },
      data() {
         return {
               userid: '',
               password: '',
               error_message: ''
         }
      },
      mounted(){
         if(localStorage.getItem('_token')){
            this.$router.push('/')
         }
      },
      methods: {
         login(){
            this.v$.$touch()
            if (this.v$.$error) {
               return false
            }else{
               this.$store.commit('is_loader', true);
               axios.post('/login',{'userid':this.userid,'password': this.password})
               .then(res => {
                  if(res.data.error === true){  
                     this.$toast.error(res.data.message);
                  }else{
                     this.$store.commit('setAuthUser', res.data.data.user)
                     console.log(this.$store.state.authData);
                     localStorage.setItem('_token',res.data.data.access_token);
                     localStorage.setItem('authData',JSON.stringify(res.data.data.user), { encrypt: false });
                     window.location.href='/'
                  }
                  this.$store.commit('is_loader', false);
               }).catch(e => {
                  this.error_message = e.response.data.message;
                  this.$store.commit('is_loader', false);
               })
            }
         }
      },
   }
</script>
<style>
   .close {
      float: right !important;
   }

</style>