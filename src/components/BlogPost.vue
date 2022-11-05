<template>
  <div class="content">
    <h2 class="content-header" v-text="title" />
    <template v-if="isWelcome">
      <div class="welcome" v-text="content" />
      <div class="content-row-link">
        <router-link
          class="link content-link link-light"
          :to="{ name: 'Register' }"
        >
          Login/Register
          <Icon light type="arrowRight" />
        </router-link>
      </div>
    </template>
    <template v-else>
      <div class="content-preview" v-html="content" />
      <div class="content-row-link">
        <small class="date" v-text="createDateTimeFromTimestamp(date)" />
        <router-link
          class="link link-dark content-link"
          :to="{ name: 'PostView', params: { id } }"
        >
          View Post
          <Icon type="arrowRight" />
        </router-link>
      </div>
    </template>
    <!-- <div class="image">
        <img :src="`/img/bg/${image}.jpg`" :alt="title">
      </div> -->
  </div>
</template>

<script>
import { createDateTimeFromTimestamp } from '@/utils/timestamp'

import Icon from '@/components/common/Icon.vue'

export default {
  name: 'BlogPost',
  components: {
    Icon,
  },
  props: {
    id: [String, Number],
    title: String,
    content: String,
    date: [String, Number],
    image: String,
    isWelcome: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    createDateTimeFromTimestamp,
  }),
}
</script>
