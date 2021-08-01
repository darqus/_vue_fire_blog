<template>
  <div class="admin">
    <div class="container">
      <h2>Administration</h2>

      <h3 class="subheader">
        Add Admin
      </h3>

      <Form
        :form="form"
        class="admin-info"
        :loading="$store.state.loading"
        @submit="$store.dispatch('userAddAdmin', form.inputs[0].value)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Form from '@/components/common/Form.vue'

import { createFormData } from '@/components/common/forms/admin'


export default {
  name: 'Admin',
  components: {
    Form,
  },
  data: () => ({
    modal: {
      active: false,
      message: 'Changes were saved!',
    },
    form: null,
  }),
  computed: {
    ...mapState({
      profile: (state) => state.profile,
    }),
  },
  created() {
    this.form = createFormData()
  },
}
</script>
