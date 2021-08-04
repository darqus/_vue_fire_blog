<template>
  <svg viewBox="0 0 24 24" class="icon-svg">
    <path :fill="fill" :d="pathMap" />
  </svg>
</template>

<script>
// https://materialdesignicons.com/
const ICONS = {
  arrowRight: 'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z',
  menu: 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
  menuOpen: 'M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z',
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
