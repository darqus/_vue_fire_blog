<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <nav class="nav nav-header">
          <div class="branding">
            <Logo class="logo" />
          </div>
          <div class="nav-links">
            <Navigation v-show="!isMobile" :admin="admin" />
            <div
              v-show="isMobile"
              ref="mobileMenu"
              class="mobile-menu"
              @click="toggleShowMobileNav"
            >
              <Icon type="menuOpen" />
            </div>
          </div>
        </nav>
        <transition name="nav-mobile">
          <Navigation v-show="showMobileNav" :admin="admin" class="nav-mobile" contain-main is-footer />
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import Icon from '@/components/common/Icon.vue'
import Logo from '@/components/Logo.vue'
import Navigation from '@/components/Navigation.vue'


export default {
  name: 'Header',
  components: {
    Icon,
    Logo,
    Navigation,
  },
  props: {
    admin: Boolean,
  },
  data: () => ({
    isMobile: false,
    showMobileNav: false,
    windowWidth: false,
  }),
  created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
    window.addEventListener('click', this.closeMobileNav)
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 750) {
        this.isMobile = true
        return
      }

      this.isMobile = false
      this.showMobileNav = false
    },
    toggleShowMobileNav() {
      this.showMobileNav = !this.showMobileNav
    },
    closeMobileNav(event) {
      const { target } = event
      if (target !== this.$refs.mobileMenu) {
        if (this.showMobileNav) {
          this.showMobileNav = false
        }
      }
    },
  },
}
</script>
