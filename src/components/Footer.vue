<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <Logo class="logo" />
        <Navigation :admin="admin" is-footer />
        <small v-text="copy" />
      </div>
    </div>
  </footer>
</template>

<script>
import Logo from '@/components/Logo.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Footer',
  components: {
    Logo,
    Navigation,
  },
  props: {
    admin: Boolean,
  },
  data: () => ({
    copy: `© 2020 — ${new Date().getFullYear()}`,
  }),
}
</script>
