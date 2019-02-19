<template>
  <Login/>
</template>

<script>
import Login from '~/components/registration/login.vue'

export default {
  components: {
    Login
  },
  layout(context) {
    return 'public'
  }
}
</script>
