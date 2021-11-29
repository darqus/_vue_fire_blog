<template>
  <div class="home">
    <div class="blog-wrapper">
      <div v-if="!user" class="blog-content">
        <div class="container row-gap-3" :class="{ 'bg-gray-dark': !user }">
          <BlogPost
            :id="welcomePost.id"
            :is-welcome="welcomePost.isWelcome"
            :title="welcomePost.title"
            :content="welcomePost.content"
            :image="welcomePost.image"
          />
        </div>
      </div>
      <template v-if="blogPostsFeed.length">
        <div v-for="{ id, title, content, date, image } in blogPostsFeed" :key="id" class="blog-content">
          <div class="container">
            <BlogPost
              :id="id"
              :title="title"
              :content="content"
              :date="date"
              :image="image"
            />
          </div>
        </div>
      </template>
    </div>
    <div v-if="blogPostsCards.length" class="blog-card-wrapper">
      <div class="container row-gap-3 bg-gray-dark">
        <div class="row">
          <h3 class="blog-card-header">
            View More Recent Blogs
          </h3>
          <div class="blog-cards">
            <BlogCard
              v-for="blog in blogPostsCards"
              :key="blog.id"
              :blog="blog"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container row-gap-3 bg-gray-light">
        <div class="row">
          <h2 class="updates-header">
            Never miss a post. Register for your free account today.
          </h2>
          <router-link class="button button-dark" :to="{ name: 'Register' }">
            Register for {{ appName }} <Icon light type="arrowRight" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/common/Icon.vue'

import BlogPost from '@/components/BlogPost.vue'
import BlogCard from '@/components/BlogCard.vue'

import { mapState, mapGetters } from 'vuex'


export default {
  name: 'Home',
  components: {
    Icon,
    BlogPost,
    BlogCard,
  },
  data: () => ({
    appName: process.env.VUE_APP_NAME,
  }),
  computed: {
    ...mapState({
      user: (state) => state.user,
      welcomePost: (state) => state.welcomePost,
      modal: (state) => state.modal,
    }),
    ...mapGetters({
      blogPostsFeed: ['blogPostsFeed'],
      blogPostsCards: ['blogPostsCards'],
    }),
  },
}
</script>
