<template>
  <div class="header-wrapper">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Show current processes</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Send</template>
        <el-menu-item index="2-1">E-mail</el-menu-item>
        <el-menu-item index="2-2">Phone message</el-menu-item>
        <el-menu-item index="2-3">Fax</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4" @click="logOut">Logout</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {},
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logOut() {
      this.$store
        .dispatch('auth/logOut')
        .then(() => this.$router.push('/login'))
    }
  }
}
</script>

<style scoped>
.el-menu {
  display: flex;
  justify-content: flex-end;
}
</style>
