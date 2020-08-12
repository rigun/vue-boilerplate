<template>
  <div id="app">
    <main>
      <div class="r-container" >
        <router-view />
      </div>
    </main>
  </div>
</template>
<style lang="scss">
.r-content-fullwidth {
  width: 100vw;
  min-height: calc(100vh - 70px);
}

html{
  overflow-y: auto !important;
}
</style>