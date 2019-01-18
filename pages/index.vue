<template>
  <el-container>
    <el-aside><Aside/></el-aside>
    <el-container>
      <el-header><Header/></el-header>
      <Main/>
      <el-footer><Footer/></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '~/components/layout/aside.vue'
import Header from '~/components/layout/header.vue'
import Main from '~/components/layout/main.vue'
import Footer from '~/components/layout/footer.vue'

export default {
  components: {
    Aside,
    Header,
    Main,
    Footer
  }
}
</script>

<style>
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
