export default {
  oneWord: {
    pattern: '[A-zА-яЁё]{2,}',
    title: (title) => `Enter ${title} with at least 2 letters`,
  },
  email: {
    pattern: '^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    title: 'For example, username@domain.com',
  },
  password: {
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\\[-`{-~])(?=.*[@#$%!]).{6,20}$',
    title: `must contains one digit from 0-9,
must contains one lowercase characters,
must contains one uppercase characters,
must contains one special symbols in the list @#$%,
length at least 6 characters and maximum of 20`,
  },
}
