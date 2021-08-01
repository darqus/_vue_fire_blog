<template>
  <div class="post-view">
    <div v-if="blog" class="container">
      <div />
      <h2 class="post-view-title" v-text="blog.title" />
      <div class="post-view-date">
        <small class="date" v-text="`Posted on: ${formatDate(blog.date)}`" />
      </div>
      <!-- <img :src="blog.coverPhoto" alt="blog.title"> -->
      <div class="post-view-content" v-html="blog.content" />
      <div />
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/formatters'

import { mapState } from 'vuex'

export default {
  name: 'PostView',
  data: () => ({
    formatDate,
  }),
  computed: {
    ...mapState({
      blog: (state) => state.blog,
    }),
  },
  async created() {
    await this.$store.dispatch('blogGetPost', { id: this.$route.params.id })
  },
}
</script>
