<template>
  <div class="aside-item-page">
    <template v-if="item.children">
      <el-submenu v-if="item.children.length>1" :index="resolvePath(item.path)">
        <template slot="title">
          <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"/>
          <span>{{item.meta.title}}</span>
        </template>
        <template v-for="child in item.children">
          <asides
            v-if="child.children&&child.children.length"
            class="nest-menu"
            :item="child"
            :key="child.path"
            :base-path="resolvePath(child.path)"
          />
          <el-menu-item
            v-else
            :key="child.path"
            :index="resolvePath(child.path)"
            :route="{ path: resolvePath(child.path) }"
          >
            {{child.meta.title}}
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item
        v-else
        :index="resolvePath(item.children[0].path)"
        :route="{ path: resolvePath(item.children[0].path) }"
      >
        <svg-icon :icon-class="item.children[0].meta.icon"/>
        <span>{{item.children[0].meta.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import {
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem
} from 'element-ui'

export default {
  name: 'asides',
  props: {
    item: Object,
    basePath: {
      type: String,
      default: ''
    }
  },
  components: {
    [Submenu.name]: Submenu,
    [MenuItemGroup.name]: MenuItemGroup,
    [MenuItem.name]: MenuItem
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    resolvePath(routePath) {
      return `${this.basePath}/${routePath}`
    }
  },
  mounted () {
    // console.log(this.$route)
  }
}
</script>

<style lang="postcss" scoped>
.aside-item-page {
  /deep/ .el-submenu,
  /deep/ .el-menu-item {
    min-width: auto;
  }
  /deep/ .svg-icon {
    margin-right: 10px;
    vertical-align: middle;
    font-size: 15px;
  }
  /deep/ .el-menu--inline li {
    background-color: #1f2d3d !important;
  }
  /deep/ .el-submenu .el-menu-item:hover {
    background-color: #001528 !important;
  }
  .nest-menu /deep/ .el-submenu>.el-submenu__title {
    background-color: #1f2d3d !important;
  }
}
</style>
