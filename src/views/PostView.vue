<template>
  <div v-if="!loading" class="post-view">
    <div class="container row-gap-2">
      <div class="row">
        <h2 v-if="blog.title" class="post-view-title" v-text="blog.title" />
        <div v-if="blog.date" class="post-view-date">
          <small class="date">
            Posted on:
            <strong v-text="createFormatDateTime(blog.date)" />
          </small>
        </div>
        <!-- <img :src="blog.coverPhoto" alt="blog.title"> -->
        <div v-if="blog.content" class="post-view-content" v-html="blog.content" />
      </div>
    </div>
  </div>
</template>

<script>
import { createFormatDateTime } from '@/utils/formatters'

import { mapState } from 'vuex'

export default {
  name: 'PostView',
  data: () => ({
    createFormatDateTime,
  }),
  computed: {
    ...mapState({
      blog: (state) => state.blog,
      loading: (state) => state.loading,
    }),
  },
  async created() {
    this.$store.commit('clearPost')
    await this.$store.dispatch('blogGetPost', { id: this.$route.params.id })
  },
}
</script>
