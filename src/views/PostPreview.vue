<template>
  <div class="post-view">
    <div class="container row-gap-2">
      <div class="row">
        <div class="post-view-actions">
          <button
            class="button small"
            @click="$router.go(-1)"
            v-text="'Return to Edit'"
          />
          <button
            class="button small"
            @click="$route.params.id
              ? $store.dispatch('blogUpdatePost', $route.params.id)
              : $store.dispatch('blogCreate')"
            v-text="$route.params.id ? 'Update' : 'Publish'"
          />
        </div>
        <h2 class="post-view-title" v-text="$store.state.blog.title" />
        <!-- <img :src="blogCoverPhoto" alt="" /> -->
        <div class="post-view-date">
          <small class="date" v-text="createFormatDateTime(new Date())" />
        </div>
        <main class="post-view-content" v-html="$store.state.blog.content" />
      </div>
    </div>
  </div>
</template>

<script>
import { createFormatDateTime } from '@/utils/formatters'

export default {
  name: 'PostPreview',
  data: () => ({
    createFormatDateTime,
  }),
}
</script>
