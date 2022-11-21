<template>
  <svg
    viewBox="0 0 24 24"
    class="icon-svg"
  >
    <path
      :fill="filled"
      :d="path"
    />
  </svg>
</template>

<script>
import ICONS from './iconsMap'


export default {
  name: 'Icon',
  props: {
    fill: {
      type: String,
      default: '#000',
    },
    type: {
      type: String,
      default: 'arrowRight',
    },
    light: {
      type: Boolean,
    },
  },
  computed: {
    filled() {
      return this.light ? '#fff' : this.fill
    },
    path() {
      return ICONS[this.type]
    },
  },
}
</script>
