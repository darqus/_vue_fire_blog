<template>
  <main id="app">
    <section>
      <Header v-if="!navigation" :admin="admin" />
      <router-view />
      <Footer v-if="!navigation" :admin="admin" />
    </section>
    <Modal v-if="modal.active" :message="modal.message" @close="close" />
    <Loading v-if="loading" />
  </main>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

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
  }),
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      modal: (state) => state.modal,
      admin: (state) => state.profile.admin,
    }),
  },
  watch: {
    $route() {
      this.checkRoute()
    },
  },
  async created() {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        this.updateUser(user)
        if (user) {
          this.userGet(user)
        }
      })
    this.checkRoute()
    await this.blogGetPosts()
  },
  methods: {
    ...mapMutations(
      ['updateUser', 'clearModal'],
    ),
    ...mapActions(
      ['userGet', 'blogGetPosts'],
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
  },
}
</script>
