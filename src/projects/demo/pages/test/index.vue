<template>
  <div class="index-page">
    <van-button type="primary" @click="show = !show">test按钮</van-button>
    <!-- <van-button type="primary" @click="showPicker = !showPicker">主要按钮</van-button>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="showPicker = false"
      />
    </van-popup> -->
    <transition name="fade-translateY">
      <div class="lin-action-sheet bottom-sheet" v-show="show">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </transition>
    <transition name="fade">
      <div class="lin-action-sheet mask" v-show="show" @click="show = !show"></div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Picker } from 'vant'

export default {
  components: {
    [Button.name]: Button,
    [Picker.name]: Picker
  },
  data () {
    return {
      show: false,
      showPicker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  }
}
</script>

<style lang="postcss" scoped>
.lin-action-sheet {
  transition: .3s ease-out;
  &.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    z-index: 100;
  }
  &.bottom-sheet {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    /* height: 250px; */
    background-color: #fff;
    z-index: 101;
    .item {
      height: 100px;
      background-color: #f00;
      &:nth-child(2) {
        background-color: #0f0;
      }
      &:nth-child(3) {
        background-color: #00f;
      }
    }
  }
}
.fade {
  /* &-enter-active {
    animation: .4s fade-in;
    
  }
  &-leave-active {
    animation: .4s fade-out;
  } */
  &-enter, &-leave-to {
    opacity: 0;
  }
  &-enter-to, &-leave {
    opacity: 1;
  }
}
.fade-translateY {
  /* &-enter-active {
    animation: .4s fade-translateY-up;
  }
  &-leave-active {
    animation: .4s fade-translateY-down;
  } */
  &-enter, &-leave-to {
    transform: translateY(100%);
  }
  &-enter-to, &-leave {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
@keyframes fade-translateY-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}
@keyframes fade-translateY-down {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
}
</style>
