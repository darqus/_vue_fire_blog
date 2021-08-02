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
        <template v-if="form.showLabels">
          <label :for="name" v-text="label" />
        </template>
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
        <template v-if="form.showLabels">
          <label
            v-show="!new RegExp(pattern).test(inputs[index].value)"
            class="error"
            :for="name"
            v-text="title"
          />
        </template>
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
