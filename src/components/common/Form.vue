<template>
  <form ref="form" @submit.prevent="$emit('submit', form)">
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
        <label v-if="form.showLabels" :for="name" v-text="label" />
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
        <label
          v-if="form.showLabels"
          v-show="!new RegExp(pattern).test(inputs[index].value)"
          class="error"
          :for="name"
          v-text="title"
        />
        <div class="icon" :class="{ 'with-labels': form.showLabels }">
          <adminIcon v-if="icon === 'adminIcon'" :class="iconClassName" />
          <email v-if="icon === 'email'" :class="iconClassName" />
          <user v-if="icon === 'user'" :class="iconClassName" />
          <password v-if="icon === 'password'" :class="iconClassName" />
        </div>
      </div>
    </div>
    <button
      class="button"
      type="submit"
      :disabled="!isValidForm"
    >
      <div v-text="form.submitButtonText || 'Sibmit'" />
      <LoadingBtn v-show="loadingValidity" />
    </button>
  </form>
</template>

<script>
import adminIcon from '@/assets/icons/user-crown-light.svg'
import user from '@/assets/icons/user-alt-light.svg'
import email from '@/assets/icons/envelope-regular.svg'
import password from '@/assets/icons/lock-alt-solid.svg'

import LoadingBtn from '@/components/LoadingBtn.vue'

export default {
  name: 'Form',
  components: {
    adminIcon,
    user,
    email,
    password,
    LoadingBtn,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
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
