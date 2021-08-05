<template>
  <nav class="nav">
    <router-link
      v-if="containMain"
      class="link"
      :to="{ name: mainRoute.name }"
      exact
      v-text="mainRoute.meta.title"
    />

    <router-link
      class="link"
      :to="{ name: overRoutes[0].name }"
      exact
      v-text="overRoutes[0].meta.title"
    />

    <router-link
      v-if="admin"
      :key="loading"
      class="link"
      :to="{ name: overRoutes[1].name }"
      exact
      v-text="overRoutes[1].meta.title"
    />

    <router-link
      v-if="!user"
      class="link"
      active-class="active"
      exact
      :to="user ? { name: profileRoutes[0].name } : { name: profileRoutes[1].name }"
      v-text="user ? profileRoutes[0].meta.title : profileRoutes[1].meta.title"
    />
    <div v-if="user && !isFooter" ref="profile" class="nav-profile" @click="toggleProfileMenu">
      <span :key="loading" v-text="$store.state.profile.initials" />
      <div v-show="profileMenu" class="profile-menu">
        <div class="nav-profile-info">
          <div :key="loading" class="initials" v-text="$store.state.profile.initials" />
          <div class="right">
            <div v-text="`${$store.state.profile.firstName} ${$store.state.profile.lastName}`" />
            <div>
              <small v-text="$store.state.profile.email" />
            </div>
          </div>
        </div>
        <div class="nav-profile-options">
          <div class="option">
            <router-link class="option" active-class="active" :to="{ name: profileRoutes[3].name }">
              <Icon light type="user" />
              <div>Profile</div>
            </router-link>
          </div>
          <!-- <div v-if="admin"  class="option">
            <router-link class="option" active-class="active" :to="{ name: profileRoutes[4].name }">
              <adminIcon class="icon" />
              <div>Add Admin</div>
            </router-link>
          </div> -->
          <div class="option" @click="$store.dispatch('userLogout')">
            <Icon light type="logout" />
            <div>Sign Out</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

import { MAIN_ROUTE, OVER_ROUTES, PROFILE_ROUTES } from '@/router'

import Icon from '@/components/common/Icon.vue'

export default {
  name: 'Navigation',
  components: {
    Icon,
  },
  props: {
    containMain: Boolean,
    isFooter: Boolean,
    admin: Boolean,
  },
  data: () => ({
    mainRoute: MAIN_ROUTE,
    overRoutes: OVER_ROUTES.slice(0, 2),
    profileRoutes: PROFILE_ROUTES,
    profileMenu: false,
  }),
  computed: {
    ...mapState({
      user: (state) => state.user,
      loading: (state) => state.loading,
    }),
  },
  created() {
    window.addEventListener('click', this.closeProfileMenu)
  },
  methods: {
    toggleProfileMenu(event) {
      const { target } = event
      if (target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu
      }
    },
    closeProfileMenu(event) {
      const { target } = event
      if (target !== this.$refs.profile) {
        if (this.profileMenu) {
          this.profileMenu = false
        }
      }
    },
  },
}
</script>
