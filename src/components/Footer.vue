<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <Logo class="logo" />
        <Navigation
          :admin="admin"
          is-footer
        />
        <div
          class="copy"
          :class="{ 'is-mobile': isMobile }"
        >
          <div
            class="small"
            v-text="info"
          />
          <div
            class="small"
            v-text="copy"
          />
        </div>
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
    isMobile: Boolean,
  },
  data: () => ({
    copy: `© 2020 — ${new Date().getFullYear()}`,
    info: `v: ${process.env.VUE_APP_VERSION} from: ${process.env.VUE_APP_BUILD_DATE}`,
  }),
}
</script>
