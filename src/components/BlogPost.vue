<template>
  <div class="content">
    <h2 class="content-header" v-text="title" />
    <template v-if="isWelcome">
      <div class="welcome" v-text="content" />
      <router-link class="link content-link link-light" :to="{ name: 'Register' }">
        Login/Register
        <Icon light type="arrowRight" />
      </router-link>
    </template>
    <template v-else>
      <div>
        <small class="date" v-text="getFormatDateTime(date)" />
      </div>
      <div class="content-preview" v-html="content" />
      <div class="content-row-link">
        <router-link class="link content-link" :to="{ name: 'PostView', params: { id } }">
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
import { getFormatDateTime } from '@/utils/formatters'

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
    getFormatDateTime,
  }),
}
</script>
