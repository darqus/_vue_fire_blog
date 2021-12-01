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
              @click="toggleShowMobileNav(!showMobileNav)"
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
import { mapState, mapMutations } from 'vuex'

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
    windowWidth: false,
  }),
  computed: {
    ...mapState({
      showMobileNav: (state) => state.profile.showMobileNav,
    }),
  },
  created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
    window.addEventListener('click', this.closeMobileNav)
  },
  methods: {
    ...mapMutations(
      ['toggleShowMobileNav'],
    ),
    checkScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 750) {
        this.isMobile = true
        return
      }

      this.isMobile = false
      this.toggleShowMobileNav(false)
    },
    closeMobileNav(event) {
      const { target } = event
      if (target !== this.$refs.mobileMenu) {
        if (this.showMobileNav) {
          this.toggleShowMobileNav(false)
        }
      }
    },
  },
}
</script>
