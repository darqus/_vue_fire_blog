<template>
  <div class="profile">
    <div class="container form">
      <div class="row">
        <h2>Account Settings</h2>

        <div v-if="profile.initials" class="initials">
          <div v-text="profile.initials" />
        </div>

        <div v-if="profile.admin" class="admin-badge">
          <Icon light type="admin" class="admin-icon" />
          <span>admin</span>
        </div>

        <Form
          :form="form"
          class="profile-info"
          :loading="loading"
          @submit="updateProfile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Icon from '@/components/common/Icon.vue'
import Form from '@/components/common/Form.vue'

import { createFormData } from '@/components/common/forms/profile'


export default {
  name: 'Profile',
  components: {
    Icon,
    Form,
  },
  computed: {
    ...mapState({
      profile: (state) => state.profile,
      modal: (state) => state.modal,
      loading: (state) => state.loading,
    }),
    form() {
      return this.createFormData()
    },
  },
  methods: {
    ...mapActions(
      ['userUpdate'],
    ),
    createFormData() {
      const { profile } = this
      if (!profile) return null
      const formData = createFormData()
      const inputs = formData.inputs.map((item) => {
        const newItem = item
        newItem.value = profile[item.name] ? profile[item.name] : ''
        return newItem
      })
      const newFormData = { ...formData }
      newFormData.inputs = inputs
      return newFormData
    },
    updateProfile(form) {
      const newProfile = this.profile
      form.inputs.map(({ value, name }) => {
        newProfile[name] = value
        return value
      })
      this.userUpdate(newProfile)
    },
  },
}
</script>
