<template>
  <div class="form-wrapper">
    <div class="container">
      <h1><Logo /></h1>
      <div class="login-register">
        Back to
        <router-link class="router-link" :to="{ name: 'Login' }" v-text="'Login'" />
      </div>
      <h2>Reset Password</h2>
      <p>Forgot your password?<br>Enter your email to reset it</p>

      <Form
        :form="form"
        class="reset"
        :loading="$store.state.loading"
        @submit="$store.dispatch('userResetPassword', form.inputs)"
      />
      <div class="angle" />
    </div>

    <div class="background" />
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import Form from '@/components/common/Form.vue'

import { createFormData } from '@/components/common/forms/reset'


export default {
  name: 'ForgotPassword',
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
