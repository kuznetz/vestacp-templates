<template>
  <Auth v-if="!authorized" @auth="auth" />
  <Templates v-else @logout="logout" />
</template>
<script>
import api from './api'
import Auth from './Auth'
import Templates from './Templates'

export default {
  name: 'app',
  components: {
    Auth,Templates
  },
  data() {
    return {
      authorized: false
    } 
  },
  methods: {
    async auth(params) {
      try {
        let result = await api.serverHttp('/api/auth',params)
        api.token = result.token
        this.authorized = true
      } catch(e) {
        alert(e.error)
      }
    },
    logout() {
      this.authorized = false
    }
  }
}
</script>
<style>
</style>
