<template>
  <div id="Home" class="r-fullheight r-flex-column">
    <!-- <user-navbar /> -->
    <main>
        <router-view />
    </main>
    <!-- <user-footer /> -->
  </div>
</template>
<script>
// import userNavbar from '@/components/main/userNavbar.vue'
// import userFooter from '@/components/main/userFooter.vue'
export default {
    components: {
    // 'user-navbar': userNavbar,
    // 'user-footer': userFooter
  },
}
</script>