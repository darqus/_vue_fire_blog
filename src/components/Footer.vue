<template>
  <footer class="footer">
    <div />
    <div class="container">
      <div class="left">
        <div class="col-1">
          <Logo class="logo" />
        </div>
        <div class="col-2">
          <Navigation is-footer />
        </div>
      </div>
      <div class="right">
        <small v-text="copy" />
      </div>
    </div>
    <div />
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
