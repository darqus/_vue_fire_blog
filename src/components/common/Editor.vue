<template>
  <div v-if="editor" class="editor">
    <div class="editor-buttons">
      <div
        v-for="{ text, paramsClass = '', paramsClick = '', onClick, icon } in buttons"
        :key="text"
        class="editor-button"
        :class="{ 'is-active': editor.isActive(paramsClass) }"
        @click="editor.chain().focus()[onClick](paramsClick).run()"
      >
        <Icon light :type="icon" class="editor-icon" />
      </div>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'

import Icon from '@/components/common/Icon.vue'

const BUTTONS = [
  {
    paramsClass: ('heading', { level: 1 }),
    paramsClick: { level: 1 },
    onClick: 'toggleHeading',
    text: 'h1',
    icon: 'h1',
  },
  {
    paramsClass: ('heading', { level: 2 }),
    paramsClick: { level: 2 },
    onClick: 'toggleHeading',
    text: 'h2',
    icon: 'h2',
  },
  {
    paramsClass: ('heading', { level: 3 }),
    paramsClick: { level: 3 },
    onClick: 'toggleHeading',
    text: 'h3',
    icon: 'h3',
  },
  {
    paramsClass: 'paragraph',
    onClick: 'setParagraph',
    text: 'paragraph',
    icon: 'paragraph',
  },
  {
    paramsClass: 'bold',
    onClick: 'toggleBold',
    text: 'bold',
    icon: 'bold',
  },
  {
    paramsClass: 'italic',
    onClick: 'toggleItalic',
    text: 'italic',
    icon: 'italic',
  },
  {
    paramsClass: 'strike',
    onClick: 'toggleStrike',
    text: 'strike',
    icon: 'strike',
  },
  {
    paramsClass: 'highlight',
    onClick: 'toggleHighlight',
    text: 'highlight',
    icon: 'highlight',
  },
  {
    paramsClass: { textAlign: 'left' },
    paramsClick: 'left',
    onClick: 'setTextAlign',
    text: 'left',
    icon: 'left',
  },
  {
    paramsClass: { textAlign: 'center' },
    paramsClick: 'center',
    onClick: 'setTextAlign',
    text: 'center',
    icon: 'center',
  },
  {
    paramsClass: { textAlign: 'right' },
    paramsClick: 'right',
    onClick: 'setTextAlign',
    text: 'right',
    icon: 'right',
  },
  {
    paramsClass: { textAlign: 'justify' },
    paramsClick: 'justify',
    onClick: 'setTextAlign',
    text: 'justify',
    icon: 'justify',
  },
]


export default {
  components: {
    Icon,
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    editor: null,
    buttons: null,
  }),

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = this.editor.getJSON().toString() === value.toString()

      if (isSame) {
        return
      }

      this.editor.commands.setContent(this.value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight,
      ],
      content: this.value,
      autofocus: true,
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })

    this.buttons = BUTTONS
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
