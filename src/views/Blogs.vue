<template>
  <div class="blog-card-wrapper">
    <div class="container">
      <div class="blog-cards">
        <BlogCard
          v-for="blog in blogPosts"
          :key="blog.id"
          :blog="blog"
          :admin="admin"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BlogCard from '@/components/BlogCard.vue'


export default {
  name: 'Blogs',
  components: {
    BlogCard,
  },
  computed: {
    ...mapState({
      blogPosts: (state) => state.blogPosts,
      admin: (state) => state.profile.admin,
    }),
  },
}
</script>
