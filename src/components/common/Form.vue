<template>
  <form
    ref="form"
    @submit.prevent="$emit('submit', form)"
  >
    <div class="inputs">
      <div
        v-for="({
          label,
          name,
          type,
          pattern,
          title,
          icon,
          iconClassName,
          required,
          disabled
        }, index) in inputs"
        :key="name"
        class="input"
      >
        <template v-if="form.showLabels">
          <label
            :for="name"
            v-text="label"
          />
          <label
            v-show="!new RegExp(pattern).test(inputs[index].value)"
            class="error"
            :for="name"
            v-text="title"
          />
        </template>
        <div class="input-row">
          <input
            :id="name"
            v-model="inputs[index].value"
            :type="type"
            :placeholder="label"
            :name="name"
            :pattern="pattern"
            :title="title"
            :required="required"
            :disabled="disabled"
            @input="checkValidity"
          >
          <div class="icon">
            <Icon
              :type="icon"
              :disabled="disabled"
              :class="iconClassName"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="button"
      :class="{ success: isValidForm }"
      type="submit"
      :disabled="!isValidForm"
    >
      <div v-text="form.submitButtonText || 'Sibmit'" />
      <LoadingBtn v-show="loadingValidity" />
    </button>
  </form>
</template>

<script>
import LoadingBtn from '@/components/LoadingBtn.vue'
import Icon from '@/components/common/Icon.vue'

export default {
  name: 'Form',
  components: {
    LoadingBtn,
    Icon,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    loading: Boolean,
  },
  data: () => ({
    isValidForm: false,
    loadingValidity: false,
    timeoutID: null,
  }),
  computed: {
    inputs() {
      return this.form?.inputs
    },
  },
  methods: {
    checkValidity() {
      this.loadingValidity = true
      this.timeoutID = setTimeout(this.ckeckIsValidForm, 500)
    },
    ckeckIsValidForm() {
      this.isValidForm = this.$refs.form.checkValidity()
      this.loadingValidity = false
    },
  },
}
</script>
