<template>
  <router-link class="blog-card" :to="{ name: 'PostView', params: { id } }">
    <div v-show="$store.state.isEditPost" class="blog-card-icons">
      <div class="blog-card-icon" @click.prevent="$router.push({ name: 'PostEdit', params: { id }})">
        <Icon type="applicationEditOutline" />
      </div>
      <div class="blog-card-icon" @click.prevent="$store.dispatch('blogDeletePost', id)">
        <Icon type="deleteOutline" />
      </div>
    </div>
    <!-- <img class="blog-card-image" :src="`/img/cards/${image}.jpg`" :alt="title"> -->
    <div class="blog-card-info">
      <h4 class="blog-card-title" v-text="title" />
      <h6 class="blog-card-date date">
        Posted on:
        <strong v-text="getFormatDateTime(date)" />
      </h6>
    </div>
  </router-link>
</template>

<script>
import { getFormatDateTime } from '@/utils/formatters'

import Icon from '@/components/common/Icon.vue'


export default {
  name: 'BlogCard',
  components: {
    Icon,
  },
  props: {
    id: [String, Number],
    title: String,
    image: String,
    date: [String, Number],
  },
  data: () => ({
    getFormatDateTime,
  }),
}
</script>
