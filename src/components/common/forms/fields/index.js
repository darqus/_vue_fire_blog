const PWD_MAP = {
  MIN: 6,
  MAX: 20,
  SPC: '@$!%*#?&',
}

const RE_MAP = {
  ONE_WORD: /[A-zА-яЁё]{2,}/,
  EMAIL: /^[\w\-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD: new RegExp(`^(?=.*[A-Za-z])(?=.*\\d)(?=.*[${PWD_MAP.SPC}])[A-Za-z\\d${PWD_MAP.SPC}]{${PWD_MAP.MIN},${PWD_MAP.MAX}}$`),
}

export default {
  oneWord: {
    pattern: RE_MAP.ONE_WORD,
    title: (title) => `Enter ${title} with at least 2 letters`,
  },
  email: {
    pattern: RE_MAP.EMAIL,
    title: 'For example, username@domain.com',
  },
  password: {
    pattern: RE_MAP.PASSWORD,
    title: `must contains one digit from 0-9,
must contains one lowercase characters,
must contains one uppercase characters,
must contains one special symbols in the list ${PWD_MAP.SPC},
length at least ${PWD_MAP.MIN} characters and maximum of ${PWD_MAP.MAX}`,
  },
}
