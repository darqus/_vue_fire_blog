<template>
  <router-link class="blog-card" :to="{ name: 'PostView', params: { id: blog.id } }">
    <div v-show="admin" class="blog-card-icons">
      <div class="blog-card-icon" @click.prevent="$router.push({ name: 'PostEdit', params: { id: blog.id }})">
        <Icon type="applicationEditOutline" />
      </div>
      <div class="blog-card-icon" @click.prevent="$store.dispatch('blogDeletePost', blog.id)">
        <Icon type="deleteOutline" />
      </div>
    </div>
    <!-- <img class="blog-card-image" :src="`/img/cards/${image}.jpg`" :alt="title"> -->
    <div class="blog-card-info">
      <h4 class="blog-card-title" v-text="blog.title" />
      <h6 class="blog-card-date date">
        Posted on:
        <strong v-text="createFormatDateTime(blog.date)" />
      </h6>
      <div class="short-content" v-html="blog.content" />
    </div>
  </router-link>
</template>

<script>
import { createFormatDateTime } from '@/utils/formatters'

import Icon from '@/components/common/Icon.vue'


export default {
  name: 'BlogCard',
  components: {
    Icon,
  },
  props: {
    blog: {
      type: Object,
      validate: (prop) => (
        prop
        && 'title' in prop
        && 'date' in prop
        && 'content' in prop
      ),
    },
    admin: Boolean,
  },
  data: () => ({
    createFormatDateTime,
  }),
}
</script>
