<template>
  <router-link class="logo" :to="{ name: mainRoute.name }" v-text="appName" />
</template>

<script>
import { MAIN_ROUTE } from '@/router'


export default {
  name: 'Logo',
  data: () => ({
    appName: process.env.VUE_APP_NAME,
    mainRoute: MAIN_ROUTE,
  }),
}
</script>
