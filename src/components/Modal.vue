<template>
  <div class="modal">
    <div class="modal-content">
      <p v-text="message" />
      <button class="button" @click="$emit('close')" v-text="'Close'" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    message: {
      type: String,
    },
  },
}
</script>
