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
                <form novalidate @submit="submitLogin()">
                    <div  class="r-inputPlace">
                        <div class="r-center-flex">
                            <label for="email" :class="error.email ? 'r-error-text' : ''">email</label>
                        </div>
                        <input type="text" :class="error.email ? 'r-error-outline' : ''" v-model="item.email" name="email" placeholder="email" class="r-isExpand" >
                        <span class="r-error-text r-body-reguler r-isBold " :class="error.email ? '' : 'r-hide-error'">{{errorMsg.email}}</span>
                    </div>
                    <div class="r-inputPlace">
                        <div class="r-center-flex">
                            <label for="password" :class="error.password ? 'r-error-text' : ''">Password</label>
                        </div>
                        <div class="r-center-flex r-hasIcon-right">
                            <input :type="show ? 'text' : 'password'" :class="error.password ? 'r-error-outline' : ''" v-model="item.password" name="password" placeholder="Password" class="r-isExpand" >
                            <img :src="require(`@/assets/icons/login/eye${show ? 'Close' : 'Open'}.svg`)" alt="" @click.prevent="show = !show">
                        </div>
                        <span class="r-error-text r-body-reguler r-isBold " :class="error.password ? '' : 'r-hide-error'">{{errorMsg.password}}</span>
                    </div>
                    <button :disabled="isLoading" class="r-primary-filled-btn r-large-size r-isExpand r-mtb-10" @click.prevent="submitLogin()">
                        {{!isLoading ? 'Masuk' : ''}}
                        <img :src="require('@/assets/loadingDot.svg')" style="width: 50px;" alt="" v-if="isLoading">
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { validateForm } from '@/plugins/validation'


export default {
    data: () => ({
        item: {
            email: null,
            password: null
        },
        error: {
            email: false,
            password: false
        },
        errorMsg: {
            email: 'Tidak boleh kosong',
            password: 'Tidak boleh kosong'
        },
        show: false,
        isLoading: false
    }),
    methods:{
        async validateInput(){
            const field = ['email','password']
            const regexValidate = [
                {
                    name: 'email',
                    regex: 'email'
                }
            ]
            const { countError, error, errorMsg } = await validateForm(field,this.item,this.error, this.errorMsg,regexValidate)

            this.error = error
            this.errorMsg = errorMsg
            return countError
        },
        async submitLogin() {
            const errorcount = await this.validateInput()
            if(errorcount == 0){
                this.isLoading= true
                await this.$store.dispatch('auth/dummyLogin')
                setTimeout(function(){ location.reload(); }, 2000);

                // this.isLoading= true
                // await this.$store.dispatch('auth/loginUser',this.item)
                // this.isLoading = false
                // var response = this.$store.getters['auth/getResponse']
                // if(response.status == 0){
                //     this.$store.dispatch("showSnackbar", {
                //         type: "error",
                //         text: response.msg
                //     })
                // }else{
                //     if(this.$store.getters['getisLoggedIn']){
                //          location.reload()
                //     }else{
                //         this.load = false;
                //         this.error.email = true
                //         this.errorMsg.email= `email dan password yang anda masukkan salah`
                //         this.error.password = true
                //         this.errorMsg.password= `email dan password yang anda masukkan salah`
                //     }
                // }
            }else{
                this.$store.dispatch("showSnackbar", {
                    type: "error",
                    text: "Mohon periksa kembali"
                })
                this.isLoading= false
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