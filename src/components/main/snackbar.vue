<template>
    <div class="r-snackbar" :class="!show ? 'r-snackbar-hide' : 'r-snackbar-show'"> 
        <div class="r-snackbar-box r-center-flex" :class="`r-${snackbar.type}-snackbarbg`">
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
    width: 100%;
}
.r-error-snackbarbg{
    background: var(--error) !important;
    .r-snackbar-text, .r-snackbar-button{
        color: var(--white) !important;
    }
}
.r-success-snackbarbg{
    background: var(--success) !important;
    .r-snackbar-text, .r-snackbar-button{
        color: var(--white) !important;
    }
}
.r-alert-snackbarbg{
    background: var(--secondary) !important;
}
</style>