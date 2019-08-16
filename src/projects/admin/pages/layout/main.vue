<template>
  <div class="main-page">
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>

export default {
  
}
</script>

<style lang="postcss" scoped>
.main-page {
  margin-left: 180px;
  margin-top: 50px;
  padding: 15px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all .3s ease;
}
.slide-enter {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-enter-to,
.slide-leave {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
