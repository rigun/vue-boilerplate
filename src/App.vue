<template>
  <div id="app">
    <div id="modal" class="r-isfull-position"  v-if="updateExists">
        <div class="r-modal-box r-mtb-20-withauto">
            <div class="r-modal-form r-p-25 r-center-text" >
                <h4 class="r-mb-16">Pembaruan Tersedia </h4>
                <p>
                    Demi kenyamanan kamu, kami terus melakukan perbaikan agar website ini semakin baik.
                </p>
                <p class="r-mtb-16 ">
                  Klik tombol dibawah ini untuk mendapatkan pembaruan.
                </p>
                <button class="r-isExpand r-primary-filled-btn r-large-size r-mtb-16" @click.prevent="refreshApp()">
                    Perbarui Sekarang
                </button>
            </div>
        </div>
    </div>
    <translation />
    <page-menu />
    <main>
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </main>
    <!-- <div :class="loading ? '' : 'r-hide-with-animation'" id="loading" style="display: flex; position: fixed; justify-content: center; align-items: center;top: 0; left: 0; right: 0; bottom: 0; z-index: 10000;background:white;">
      <img :src="require('@/assets/firstLoad.svg')" alt="loading. . " style="width: 150px">
    </div> -->
    <div class="isDemo r-primary-alert" v-if="isDemo == 1">
      DEMO ONLY
    </div>
    <r-snackbar />
  </div>
</template>
<script>
import RSnackbar from '@/components/main/snackbar.vue'
import update from './mixins/update'
import translation from '@/components/main/translationSwitcher'
import pageMenu from '@/components/main/menu'

export default {
  components: {
    "r-snackbar": RSnackbar,
    translation,
    pageMenu
  },
  data: () =>({
    loading: true,
    isDemo: process.env.VUE_APP_IS_DEMO
  }),
  computed:{
    modal(){
      return this.$store.getters['getModal']
    },
    isLoggedIn(){
      return this.$store.getters['getisLoggedIn']
    }
  },
  mixins: [update],
  mounted(){
    setTimeout(() => {
      this.loading = false
    }, 3000)
  }
}
</script>