<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose">
    <div index="0" class="logo-container">
      <i class="el-icon-menu"><text>&nbsp;&nbsp;&nbsp;Simple auth</text></i>
    </div>
    <nuxt-link to="/">
      <el-menu-item index="1">
        <i class="material-icons">home</i>
        <span>&nbsp;&nbsp;&nbsp;Home</span>
      </el-menu-item>
    </nuxt-link>
    <el-submenu index="2">
      <template slot="title">
        <i class="material-icons">folder</i>
        <span>&nbsp;&nbsp;&nbsp;Catalogues</span>
      </template>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="material-icons">build</i>
        <span>&nbsp;&nbsp;&nbsp;Administration</span>
      </template>
      <nuxt-link to="/administration/users">
        <el-menu-item index="1-1">
          <i class="material-icons">person</i>
          <span>&nbsp;&nbsp;&nbsp;Users</span>
        </el-menu-item>
      </nuxt-link>
      <nuxt-link to="/administration/groups">
        <el-menu-item index="1-2">
          <i class="material-icons">group</i>
          <span>&nbsp;&nbsp;&nbsp;Groups</span>
        </el-menu-item>
      </nuxt-link>
    </el-submenu>
    <el-menu-item index="4" disabled>
      <i class="el-icon-document"/>
      <span>Games</span>
    </el-menu-item>
    <nuxt-link to="/about">
      <el-menu-item index="5">
        <i class="material-icons">comment</i>
        <span>&nbsp;&nbsp;&nbsp;About</span>
      </el-menu-item>
    </nuxt-link>
  </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  props: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.logo-container {
  background-color: #35373a;
  height: 60px;
  text-align: left;
  padding-left: 1rem;
}
.logo-container i, .logo-container text{
  line-height: 3.5rem;
  font-family: "Mistral";
  font-weight: bold;
  font-size: 1.5rem;
  color: #ffff;
}
.el-menu {
  height: 100vh;
  color: #ffff;
}
.el-menu a {
  text-decoration: none;
  color: inherit;
}
</style>
