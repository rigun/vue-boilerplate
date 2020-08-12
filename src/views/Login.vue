<template>
    <div id="Login" class="r-center-flex">
        <div class="r-customplace">
            <div class="r-center-flex r-header-login">
                <img :src="require('@/assets/logo.png')" class="logo" alt="">
                <div class="r-opacity-white"></div>
            </div>
            <div class="box">
                <div class="r-text-custom mb-1">
                    <h1>Selamat datang</h1>
                    <p>Silahkan login untuk melanjutkan</p>
                </div>
                <div class="r-inputField">
                    <div class="r-labelText">
                        Username
                    </div>
                    <div class="r-hasIcon-right r-md-size">
                        <input class="r-input" type="text" v-model="user.username" :class="error.username ? 'r-red-outline' : ''" @keyup="error.username = false" @keypress.enter="submitLogin()">
                    </div>
                    <div class="r-danger-text" :style="error.username ? 'opacity: 1 !important;': ''">
                        {{errorMsg.username}}
                    </div>
                </div>
                <div class="r-inputField">
                    <div class="r-labelText">
                        Password
                    </div>
                    <div class="r-hasIcon-right r-md-size">
                        <input class="r-input" :type="showpassword ? 'text' : 'password'" v-model="user.password"  :class="error.password ? 'r-red-outline' : ''" @keyup="error.password = false" @keypress.enter="submitLogin()">
                        <div class="r-inputIcon r-center-flex">
                            <img :src="require(`@/assets/icons/login/${showpassword ? 'eyeClose' : 'eyeOpen'}.svg`)" alt="" @click="showpassword = !showpassword">    
                        </div>
                    </div>
                    <div class="r-danger-text" :style="error.password ? 'opacity: 1 !important;': ''">
                        {{errorMsg.password}}
                    </div>
                </div>
               
                <button class="r-button r-primary-btn r-is-fullwidth r-md-size" @click.prevent="submitLogin()">
                    <span v-if="!load">Login</span>
                    <img :src="require('@/assets/loadingDot.svg')" alt style="width: 50px;" v-else />
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: () => ({
        user: {
            username: null,
            password: null
        },
        error: {
            username: false,
            password: false
        },
        errorMsg: {
            username: 'Tidak boleh kosong',
            password: 'Tidak boleh kosong'
        },
        showpassword: false,
        isLoading: false
    }),
    methods:{
        validateInput(){
            var error = 0;
            if(this.user.password == '' || this.user.password == null){
                this.error.password = true
                this.errorMsg.password = 'Password tidak boleh kosong'
                error +=1 
            }else{
                this.error.password = false
            }
            if(this.user.username == '' || this.user.username == null){
                this.error.username = true
                this.errorMsg.username = 'Username tidak boleh kosong'
                error +=1 
            }else{
                this.error.username = false
            }
            return error
        },
        async submitLogin() {
            if(this.validateInput() != 0){
                return 
            }else{
                this.error.password = false
                this.error.username = false
            }
            this.isLoading= true
            await this.$store.dispatch('auth/loginUser',this.user)
            this.isLoading = false
            var response = this.$store.getters['auth/getResponse']
            if(response.status == 0){
                this.$store.dispatch("showSnackbar", {
                    type: "error",
                    text: response.msg
                })
            }else{
                if(this.$store.getters['getisLoggedIn']){
                    this.$router.push({ name: 'Dashboard' })
                }else{
                    this.load = false;
                    this.error.username = true
                    this.errorMsg.username= `Username dan password yang anda masukkan salah`
                    this.error.password = true
                    this.errorMsg.password= `Username dan password yang anda masukkan salah`
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    #Login{
        min-width: 100vw;
        max-width: 100vw;
        min-height: 100vh;
        max-height: 100vh;
        background: #f7f7f7;
        .logo{
            width: 80px;
            margin: auto;
            z-index: 100;
        }
        .r-header-login{
            background-image: url('~@/assets/login-header-image.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
            position: relative;
            padding: 10px;
            .r-opacitr-white{
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background: white;
                opacity: 0.4;
            }
        }
    }
    .r-center-flex{
        display: flex;
        align-items: center;
    }
    .r-customplace{
        max-width: 450px;
        margin: auto;
        padding: 0px 16px;
    }
    .r-text-custom{
        h1{
            font-weight: bold;
            font-size: 20px;
        }
    }
    .mt-1{
        margin-top: 1rem;
    }
    .mb-1{
        margin-bottom: 1rem;
    }
    .box{
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        display: block;
        padding: 1.25rem;
    }

</style>