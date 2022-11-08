<template>
  <div id="app">
    <Header
      v-if="!navigation"
      :admin="admin"
      :is-mobile="isMobile"
    />
    <section :class="{ overlay: loading || showMobileNav }">
      <router-view />
      <Loading v-if="loading" />
    </section>
    <Footer
      v-if="!navigation"
      :admin="admin"
      :is-mobile="isMobile"
    />
    <Modal
      v-if="modal.active"
      :message="modal.message"
      @close="close"
    />
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import { mapState, mapMutations, mapActions } from 'vuex'

import { PROFILE_ROUTES } from '@/router'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Modal from '@/components/Modal.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Modal,
    Loading,
  },
  data: () => ({
    navigation: null,
    isMobile: false,
    windowWidth: false,
  }),
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      modal: (state) => state.modal,
      admin: (state) => state.profile.admin,
      showMobileNav: (state) => state.profile.showMobileNav,
    }),
  },
  watch: {
    $route() {
      this.checkRoute()
    },
  },
  async created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
    window.addEventListener('click', this.closeMobileNav)

    firebase
      .auth()
      .onAuthStateChanged((user) => {
        this.updateUser(user)
        if (user) {
          this.getUser(user)
        }
      })
    this.checkRoute()
    await this.getBlogs()
  },
  methods: {
    ...mapMutations(
      [
        'updateUser',
        'clearModal',
        'toggleShowMobileNav',
      ],
    ),
    ...mapActions(
      [
        'getUser',
        'getBlogs',
      ],
    ),
    checkRoute() {
      const ROUTES = [
        PROFILE_ROUTES[0].name,
        PROFILE_ROUTES[1].name,
        PROFILE_ROUTES[2].name,
      ]
      const isProfileRoutes = ROUTES.includes(this.$route.name)
      this.navigation = isProfileRoutes
    },
    close() {
      this.clearModal()
    },
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
