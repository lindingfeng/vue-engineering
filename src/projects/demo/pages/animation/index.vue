<template>
  <div class="index-page">
    <!-- <div style="height: 500px;"></div> -->
    <van-button type="primary" @click="show = !show">ActionSheet按钮</van-button>
    <van-button type="primary" @click="showPicker = !showPicker">Picker按钮</van-button>
    <van-action-sheet
      v-model="showPicker"
      :actions="actions"
      :lock-scroll="false"
      @select="showPicker = !showPicker"
    />
    <transition name="fade-translateY">
      <div class="lin-action-sheet bottom-sheet" v-show="show" @touchmove.stop>
        <div v-for="(item, index) in 5" :key="index" class="item">
          <span>选项一</span>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="lin-action-sheet mask" v-show="show" @click="show = false" @touchmove.prevent></div>
    </transition>
    <!-- <div style="height: 500px;"></div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Picker, Popup, ActionSheet } from 'vant';

export default {
  watch: {
    show (val) {
      if (val) {
        document.body.classList.add('hidden')
      } else {
        document.body.classList.remove('hidden')
      }
    }
  },
  components: {
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [ActionSheet.name]: ActionSheet
  },
  data () {
    return {
      show: false,
      showPicker: false,
      actions: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项' },
        { name: '选项' },
        { name: '选项' },
        { name: '选项' }
      ]
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
    /* max-height: 200px; */
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    bottom: 0;
    background-color: #fff;
    z-index: 101;
    .item {
      position: relative;
      text-align: center;
      height: 50px;
      font-size: 16px;
      line-height: 50px;
      background-color: #fff;
      span {
        color: #323233;
      }
      &:active {
        background-color: #f2f3f5;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: #ebedf0;
        transform: scaleY(0.5);
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
