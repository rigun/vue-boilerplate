<template>
    <div class="r-snackbar" :class="!show ? 'r-snackbar-hide' : 'r-snackbar-show'"> 
        <div class="r-snackbar-box" :class="`y-${snackbar.type}-bg`">
            <div class="r-snackbar-text">
                {{snackbar.text}}
            </div>
            <div class="r-snackbar-action" v-if="snackbar.withclose">
                <div class="r-snackbar-button" @click.prevent="hideSnackbar()">
                    Close
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// Snackbar type :
// - success
// - error
// - alert
export default {
    watch: {
        show(){
            this.setTime()
        }
    },
    computed:{
        show(){
            return this.snackbar.show
        },
        snackbar(){
            return this.$store.getters['getSnackbar']
        }
    },
    data: () => ({
        hideSnackbarTime: null
    }),
    methods:{
        setTime() {
            clearTimeout(this.hideSnackbarTime);
            this.hideSnackbarTime = setTimeout( () => {this.$store.dispatch("hideSnackbar")}, 2000);
        },
        clearTime() {
            clearTimeout(this.hideSnackbarTime);
        },
        hideSnackbar(){
            this.$store.dispatch("hideSnackbar")
        }
    }
}
</script>
<style scoped lang="scss">
.r-snackbar-show{
    bottom: 16px;
    transition: all 500ms ease-in;
}
.r-snackbar-hide{
    bottom: -50px;
    transition: all 500ms ease-out;
}
.r-snackbar{
    position: fixed;
    height: 50px;
    z-index: 10000000000;
    .r-snackbar-box{
        color: white;
        margin: 0px auto;
        display: flex;
        align-items: center;
        padding: 0px 12px;
        border-radius: 4px;
        box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.32);
        overflow: hidden;
        height: 50px;
        .r-snackbar-text{
            margin-right: auto;
            font-style: normal;
            font-weight: 500;
            cursor: default;
        }
        .r-snackbar-action{
            display: flex;
            align-items: center;
            justify-content: center;
            .r-snackbar-button{
                cursor: pointer;
                font-style: normal;
                font-weight: 600;
            }
        }
    }
}
</style>