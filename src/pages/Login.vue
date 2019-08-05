<template>
  <div class="layout-padding container fullscreen">
    <!-- <div class="logo-box">

    </div> -->
        <q-img
          :src="url"
          style="width: 100%"
        >
          <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
            Tumana Flood Monitoring
          </div>
        </q-img>
    <div class="login-form">
        <q-form ref="myForm">
            <q-input 
                color="purple-12" 
                v-model="Username" 
                label="Username" 
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Username is Required']">
                <template v-slot:prepend>
                    <q-icon name="account_circle" />
                </template>
            </q-input>
            <q-input 
                type="password" 
                color="purple-12" 
                v-model="Password" 
                label="Password"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Password is Required']">
                
                <template v-slot:prepend>
                    <q-icon name="vpn_key" />
                </template>
            </q-input>

            <q-input 
                color="purple-12" 
                v-model="ServerUrl" 
                label="Server">
                <template v-slot:prepend>
                    <q-icon name="account_circle" />
                </template>
            </q-input>

        </q-form>
        <div class="submit">
          <q-btn @click="onClickLogin" color="black" class="full-width q-mt-md" label="Login" />
          <q-btn @click="onClickUpdateServer" color="black" class="full-width q-mt-md" label="Update Server" />
        </div>
    </div>
    <div class="options">
      
      <!-- <q-btn color="black" class="full-width q-mt-md" label="Forgot Password" /> -->
    </div>
  </div>
</template>
<style scoped>
  .container{
    display: flex;
    flex-flow: column;
  }
  .logo-box{
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 200px;
    height: 200px;
  }
  .login-form{
    padding: 20px;
    margin-top: 25px;
  }
  input{
    border-bottom: 1px solid white !important;
    margin:20px;
  }
  input::placeholder{
    font-size: 1em;
    font-weight: lighter;
  }
  .submit{
    border-radius: 20px;
    margin-top: 40px;
  }
  .options{
    margin: 4.5% 5% 5% 5%;
    font-size: 0.8em;
  }
  .footer{
    font-size: 0.7em;
    text-align: center;
    position: absolute;
    bottom: 12px;
    left: 0px;
    right: 0px;
  }
</style>


<script>
import ErrorDialog from '../components/ErrorDialog'

export default {
  data() {
      return {
          ServerUrl: '',
          url: '/statics/logo-flood.png',
          Username: '',
          Password: ''
      }
  },
  methods: {
      onClickLogin() {
        var password = this.Password;
        var username = this.Username;
        var _this = this;
        this.$refs.myForm.validate().then(success => {
            if (success) {
                
                var postData = {
                    Username: username,
                    Password: password
                };
                _this.$Loading.show();
                _this.Endpoints.login({
                    data: postData,
                    success: (response) => {
                        //var apiResponse = response.data
                        if (response.data.Status === "Success") {
                            //Set store
                            _this.$store.commit("setCurrentUser", response.data.Data);
                            _this.$router.push('/main/');
                        } else {
                            _this.$q.dialog({
                                component: ErrorDialog,
                                root: _this.$root,
                                message: response.data.Message,
                                title: "Error"
                            })
                        }
                        _this.$Loading.hide();
                    },
                    error: () => {
                        _this.$q.dialog({
                            component: ErrorDialog,
                            root: _this.$root,
                            message: "An Error Occurred Please Try Again.",
                            title: "Error"
                        })
                        _this.$Loading.hide();
                    }
                });
                // this.$q.dialog({
                //     component: ErrorDialog,
                //     root: this.$root,
                //     message: "An Error Occured Please Try Again.",
                //     title: "Error"
                // })
            }
        });

      },
      onClickUpdateServer() {
        this.$store.commit("setServerUrl", this.ServerUrl);
      }
  },
  beforeMount() {
    if (this.$store.getters.currentUser != null) {
        this.$router.push('/main');
    }
  },
  mounted() {
    if (this.$store.getters.currentUser != null) {
      this.$router.push('/main');
    }
  }
};
</script>