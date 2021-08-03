<template>
  <div class="form-wrapper">
    <div class="container form">
      <h1><Logo /></h1>
      <div class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }" v-text="'Login'" />
      </div>
      <h2>Create Your {{ appName }} Account</h2>

      <Form
        :form="form"
        class="register"
        :loading="$store.state.loading"
        @submit="$store.dispatch('userRegister', form.inputs)"
      />
      <div class="angle" />
    </div>

    <div class="background" />
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import Form from '@/components/common/Form.vue'

import { createFormData } from '@/components/common/forms/register'


export default {
  name: 'Register',
  components: {
    Logo,
    Form,
  },
  data: () => ({
    appName: process.env.VUE_APP_NAME,
    form: createFormData(),
  }),
}
</script>
