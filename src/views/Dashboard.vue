<template>
  <div id="Dashboard">
    <r-sidebar v-if="$store.getters['getisLoggedIn']" />
    <r-navbar v-if="$store.getters['getisLoggedIn']" />
    <main :class="$store.getters['getisLoggedIn'] ? !collapse ? 'r-content' : 'r-content r-move-container' : 'r-content-fullwidth'">
      <div class="r-container" >
        <router-view />
      </div>
    </main>
    <r-snackbar />
  </div>
</template>
<style lang="scss">

.r-content-fullwidth {
  width: 100vw;
  height: 100vh;
  background: #fafbfc;
}
.r-move-container{
  width: 100% !important;
  padding-left: 0px !important;
}
.r-content {
  transition: all 0.2s ease;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #F6F6F6;
  padding-left: 230px;
  padding-top: 80px;
}

</style>
<script>
function loadMain(view) {
  return () =>
    import(
      /* webpackChunkName: "main-[request]" */ `@/components/main/${view}.vue`
    );
}
export default {
  components: {
    "r-navbar": loadMain("navbar"),
    "r-sidebar": loadMain("sidebar"),
    "r-snackbar": loadMain("snackbar")
  },
  computed:{
    collapse(){
      return this.$store.getters['getCollapse']
    }
  },
};
</script>