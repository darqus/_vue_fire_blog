<template>
  <div class="form-wrapper">
    <div class="form">
      <h1>
        <Logo />
      </h1>
      <div class="login-register">
        Don't have an account?
        <router-link
          class="router-link"
          :to="{ name: 'Register' }"
          v-text="'Register'"
        />
      </div>
      <h2>Login to {{ appName }}</h2>

      <Form
        :form="form"
        class="login"
        :loading="$store.state.loading"
        @submit="$store.dispatch('userLogin', form.inputs)"
      />

      <router-link
        class="forgot-password"
        :to="{ name: 'ForgotPassword' }"
        v-text="'Forgot your password?'"
      />
      <div class="angle" />
    </div>

    <div class="background" />
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import Form from '@/components/common/Form.vue'

import { createFormData } from '@/components/common/forms/login'


export default {
  name: 'Login',
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
