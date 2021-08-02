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
        <div class="icon">
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
      v-text="form.submitButtonText || 'Sibmit'"
    />
  </form>
</template>

<script>
import adminIcon from '@/assets/icons/user-crown-light.svg'
import user from '@/assets/icons/user-alt-light.svg'
import email from '@/assets/icons/envelope-regular.svg'
import password from '@/assets/icons/lock-alt-solid.svg'


export default {
  name: 'Form',
  components: {
    adminIcon,
    user,
    email,
    password,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isValidForm: false,
    timeoutID: null,
  }),
  computed: {
    inputs() {
      return this.form?.inputs
    },
  },
  methods: {
    checkValidity() {
      clearTimeout(this.timeoutID)
      this.timeoutID = setTimeout(this.ckeckIsValidForm, 500)
    },
    ckeckIsValidForm() {
      this.isValidForm = this.$refs.form.checkValidity()
    },
  },
}
</script>
