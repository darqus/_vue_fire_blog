<template>
  <div v-if="!loading" class="post-view">
    <div class="container row-gap-2">
      <div class="row">
        <div v-if="admin" class="post-view-actions">
          <button
            class="button"
            @click.prevent="$router.push({ name: 'PostEdit', params: { id: blog.id }})"
            v-text="'Edit Blog'"
          />
          <button
            class="button"
            @click.prevent="$store.dispatch('blogDeletePost', blog.id)"
            v-text="'Delete Blog'"
          />
        </div>
        <h2 v-if="blog.title" class="post-view-title" v-text="blog.title" />
        <div v-if="blog.date" class="post-view-date">
          <small class="date">
            Posted on:
            <strong v-text="createFormatDateTime(blog.date)" />
          </small>
        </div>
        <!-- <img :src="blog.coverPhoto" alt="blog.title"> -->
        <div v-if="blog.content" class="post-view-content" v-html="blog.content" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { createFormatDateTime } from '@/utils/formatters'


export default {
  name: 'PostView',
  data: () => ({
    createFormatDateTime,
  }),
  computed: {
    ...mapState({
      blog: (state) => state.blog,
      loading: (state) => state.loading,
      admin: (state) => state.profile.admin,
    }),
  },
  async created() {
    this.$store.commit('clearPost')
    await this.$store.dispatch('blogGetPost', { id: this.$route.params.id })
  },
}
</script>
