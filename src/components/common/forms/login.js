import fields from './fields'

export const createFormData = () => ({
  showLabels: false,
  inputs: [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: '',
      pattern: fields.email.pattern,
      title: fields.email.title,
      icon: 'email',
      required: true,
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      value: '',
      pattern: fields.password.pattern,
      title: fields.password.title,
      icon: 'password',
      required: true,
    },
  ],
  submitButtonText: 'Sign In',
})
