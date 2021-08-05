<template>
  <div class="post-view">
    <div v-if="blog" class="container row-gap-2">
      <div class="row">
        <h2 class="post-view-title" v-text="blog.title" />
        <div class="post-view-date">
          <small class="date" v-text="`Posted on: ${getFormatDateTime(blog.date)}`" />
        </div>
        <!-- <img :src="blog.coverPhoto" alt="blog.title"> -->
        <div class="post-view-content" v-html="blog.content" />
      </div>
    </div>
  </div>
</template>

<script>
import { getFormatDateTime } from '@/utils/formatters'

import { mapState } from 'vuex'

export default {
  name: 'PostView',
  data: () => ({
    getFormatDateTime,
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
