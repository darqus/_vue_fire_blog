const PWD_RANGE_MAP = {
  MIN: 6,
  MAX: 20,
}

const RE_MAP = {
  ONE_WORD: /[A-zА-яЁё]{2,}/,
  EMAIL: /^[\w\-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD: new RegExp(`^(?=._[A-Za-z])(?=._\\d)[A-Za-z\\d]{${PWD_RANGE_MAP.MIN},${PWD_RANGE_MAP.MAX}}$`),
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
must contains one special symbols in the list @#$%,
length at least ${PWD_RANGE_MAP.MIN} characters and maximum of ${PWD_RANGE_MAP.MAX}`,
  },
}
