<template>
  <router-link class="blog-card" :to="{ name: 'PostView', params: { id } }">
    <div v-show="$store.state.isEditPost" class="blog-card-icons">
      <div class="blog-card-icon" @click.prevent="$router.push({ name: 'PostEdit', params: { id }})">
        <Edit class="edit" />
      </div>
      <div class="blog-card-icon" @click.prevent="$store.dispatch('blogDeletePost', id)">
        <Delete class="delete" />
      </div>
    </div>
    <!-- <img class="blog-card-image" :src="`/img/cards/${image}.jpg`" :alt="title"> -->
    <div class="blog-card-info">
      <h4 class="blog-card-title" v-text="title" />
      <h6 class="blog-card-date date" v-text="'Posted on: ' + formatDate(date)" />
    </div>
  </router-link>
</template>

<script>
import { formatDate } from '@/utils/formatters'

import Edit from '@/assets/icons/edit-regular.svg'
import Delete from '@/assets/icons/trash-regular.svg'


export default {
  name: 'BlogCard',
  components: {
    Edit,
    Delete,
  },
  props: {
    id: [String, Number],
    title: String,
    image: String,
    date: [String, Number],
  },
  data: () => ({
    formatDate,
  }),
}
</script>
