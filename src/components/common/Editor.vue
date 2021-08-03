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
        <component :is="icon" class="editor-icon" />
      </div>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script>
import BtnFormatHeaderOne from '@/assets/editor/format-header-1.svg'
import BtnFormatHeaderTwo from '@/assets/editor/format-header-2.svg'
import BtnFormatHeaderTree from '@/assets/editor/format-header-3.svg'
import BtnFormatParagraph from '@/assets/editor/format-paragraph.svg'
import BtnFormatBold from '@/assets/editor/format-bold.svg'
import BtnFormatItalic from '@/assets/editor/format-italic.svg'
import BtnStrikeThrough from '@/assets/editor/format-strikethrough-variant.svg'
import BtnHighlight from '@/assets/editor/format-color-highlight.svg'
import BtnFormatAlignLeft from '@/assets/editor/format-align-left.svg'
import BtnFormatAlignCenter from '@/assets/editor/format-align-center.svg'
import BtnFormatAlignRight from '@/assets/editor/format-align-right.svg'
import BtnFormatAlignJustify from '@/assets/editor/format-align-justify.svg'

import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'


const BUTTONS = [
  {
    paramsClass: ('heading', { level: 1 }),
    paramsClick: { level: 1 },
    onClick: 'toggleHeading',
    text: 'h1',
    icon: 'BtnFormatHeaderOne',
  },
  {
    paramsClass: ('heading', { level: 2 }),
    paramsClick: { level: 2 },
    onClick: 'toggleHeading',
    text: 'h2',
    icon: 'BtnFormatHeaderTwo',
  },
  {
    paramsClass: ('heading', { level: 3 }),
    paramsClick: { level: 3 },
    onClick: 'toggleHeading',
    text: 'h3',
    icon: 'BtnFormatHeaderTree',
  },
  {
    paramsClass: 'paragraph',
    onClick: 'setParagraph',
    text: 'paragraph',
    icon: 'BtnFormatParagraph',
  },
  {
    paramsClass: 'bold',
    onClick: 'toggleBold',
    text: 'bold',
    icon: 'BtnFormatBold',
  },
  {
    paramsClass: 'italic',
    onClick: 'toggleItalic',
    text: 'italic',
    icon: 'BtnFormatItalic',
  },
  {
    paramsClass: 'strike',
    onClick: 'toggleStrike',
    text: 'strike',
    icon: 'BtnStrikeThrough',
  },
  {
    paramsClass: 'highlight',
    onClick: 'toggleHighlight',
    text: 'highlight',
    icon: 'BtnHighlight',
  },
  {
    paramsClass: { textAlign: 'left' },
    paramsClick: 'left',
    onClick: 'setTextAlign',
    text: 'left',
    icon: 'BtnFormatAlignLeft',
  },
  {
    paramsClass: { textAlign: 'center' },
    paramsClick: 'center',
    onClick: 'setTextAlign',
    text: 'center',
    icon: 'BtnFormatAlignCenter',
  },
  {
    paramsClass: { textAlign: 'right' },
    paramsClick: 'right',
    onClick: 'setTextAlign',
    text: 'right',
    icon: 'BtnFormatAlignRight',
  },
  {
    paramsClass: { textAlign: 'justify' },
    paramsClick: 'justify',
    onClick: 'setTextAlign',
    text: 'justify',
    icon: 'BtnFormatAlignJustify',
  },
]


export default {
  components: {
    BtnFormatHeaderOne,
    BtnFormatHeaderTwo,
    BtnFormatHeaderTree,
    BtnFormatParagraph,
    BtnFormatBold,
    BtnFormatItalic,
    BtnStrikeThrough,
    BtnHighlight,
    BtnFormatAlignLeft,
    BtnFormatAlignCenter,
    BtnFormatAlignRight,
    BtnFormatAlignJustify,
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
