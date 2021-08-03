<template>
  <div class="blog-card-wrapper">
    <template v-if="admin">
      <div class="container">
        <div class="toggle-edit">
          <div>Toggle Editing Post</div>
          <input v-model="editPost" class="blog-checkbox" type="checkbox">
        </div>
      </div>
    </template>
    <div class="container">
      <div class="blog-cards">
        <BlogCard
          v-for="{ id, title, image, date } in blogPosts"
          :id="id"
          :key="id"
          :title="title"
          :image="image"
          :date="date"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import BlogCard from '@/components/BlogCard.vue'


export default {
  name: 'Blogs',
  components: {
    BlogCard,
  },
  computed: {
    ...mapState({
      blogPosts: (state) => state.blogPosts,
      isEditPost: (state) => state.isEditPost,
      admin: (state) => state.profile.admin,
    }),
    editPost: {
      get() {
        return this.isEditPost
      },
      set(payload) {
        this.toggleEditPost(payload)
      },
    },
  },
  beforeDestroy() {
    this.toggleEditPost(false)
  },
  methods: {
    ...mapMutations(
      ['toggleEditPost'],
    ),
  },

}
</script>
