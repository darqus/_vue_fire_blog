<template>
  <svg viewBox="0 0 24 24" class="icon-svg">
    <path :fill="fill" :d="pathMap" />
  </svg>
</template>

<script>
// https://materialdesignicons.com/
const ICONS = {
  arrowRight: 'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z',
}


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
  },
  computed: {
    pathMap() {
      return ICONS[this.type]
    },
  },
}
</script>
