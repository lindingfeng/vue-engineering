<template>
  <div class="index-page">
    <cube-button>Button</cube-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'cube-ui'

export default {
  components: {
    [Button.name]: Button
  },
  data () {
    return {
    }
  },
  methods: {
    showSome () {
    }
  }
}
</script>

<style lang="postcss" scoped>
.content {
  .font {
    font-size: 16px;
  }
}
</style>
