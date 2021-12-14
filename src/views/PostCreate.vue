<template>
  <div class="create-post">
    <div class="container row-gap-2">
      <div class="row">
        <div class="blog-actions">
          <button
            class="button"
            :disabled="emptyBlog"
            @click="clearPost"
            v-text="'Clear Post'"
          />
          <router-link
            class="button"
            :class="{ inactive: emptyBlog }"
            :disabled="emptyBlog"
            :to="{ name: 'PostPreviewCreate' }"
            v-text="'Post Preview'"
          />
          <button
            class="button"
            :disabled="emptyBlog"
            @click="$store.dispatch('blogCreate')"
            v-text="'Publish'"
          />
        </div>
        <div class="blog-info">
          <input
            :value="blog.title"
            type="text"
            name="Title"
            placeholder="Enter Blog Title"
            @input="updateBlogTitle($event.target.value)"
          >
        <!-- <div class="upload-file">
          <label for="blog-image" />
          <input id="blog-image" ref="blogImage" type="file" name="file" accept=".png, .jpg">
          <button
            class="button button-preview"
            :class="{ active: !blog.imageURL }"
            v-text="'Preview Image'"
          />
          <span>File Chozen: {{ blog.imageName }}</span>
        </div> -->
        </div>
        <Editor
          :value.sync="blog.content"
          @input="updateBlogContent($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { validatePost } from '@/utils/validator'
import { mapState, mapMutations } from 'vuex'

import Editor from '@/components/common/Editor.vue'


export default {
  name: 'PostCreate',
  components: {
    Editor,
  },
  computed: {
    ...mapState({
      blog: (state) => state.blog,
      isEditedPost: (state) => state.isEditedPost,
    }),
    emptyBlog() {
      const emptyBlog = validatePost(this.blog?.title, this.blog?.content)
      return emptyBlog
    },
  },
  created() {
    if (!this.isEditedPost) {
      this.clearPost()
    }
  },
  methods: {
    ...mapMutations(
      [
        'updateBlogTitle',
        'updateBlogContent',
        'clearPost',
      ],
    ),
  },
}
</script>
