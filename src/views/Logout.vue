<template>
  <div class="r-logout">
     <img :src="require('@/assets/spinning-circles.svg')" alt="loading. . ">
  </div>
</template>

<script>
export default {
  mounted() {
    this.logoutUser()
  },
  methods: {
    async logoutUser() {
      try{
        await this.unsubscribeUser()
      }catch(e){
        console.log(e)
      }
      await this.$store.dispatch("logoutStorage");
      location.reload()
    },
    async unsubscribeUser() {
      if (Notification.permission !== 'granted') {
        await this.$store.dispatch('auth/logoutUser',null);
        return;
      }
      await navigator.serviceWorker.ready
          .then((registration) => {
              const subscribeOptions = {
                  userVisibleOnly: true,
                  applicationServerKey: this.urlB64ToUint8Array(process.env.VUE_APP_VAPID)
              };
              return registration.pushManager.subscribe(subscribeOptions);
          })
          .then(async (pushSubscription) => {
              await this.$store.dispatch('auth/logoutUser',pushSubscription);
          });
    },
    urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        // eslint-disable-next-line no-useless-escape
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
  }
};
</script>
<style lang="scss" scoped>
.r-logout{
  position: fixed;
  background: #f9f5f5cc;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 10000000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  img{
    width: 100px;
  }
}
</style>