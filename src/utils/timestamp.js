// https:// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

const E_ZONE_LIST = {
  EN: 'en',
  RU: 'ru',
}

const ZONE = E_ZONE_LIST.EN

const OPTIONS_PRESETS = {
  formattedDateAndTime: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  },
  longDateAndLongTime: { dateStyle: 'long', timeStyle: 'long' },
  shortDateAndLongTime: {
    dateStyle: 'short',
    timeStyle: 'long',
    hour12: false,
  },
  onlyTime: {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  },
}

const OPTIONS = OPTIONS_PRESETS.formattedDateAndTime

const createDateTimeFromTimestamp = (ts) => {
  if (!ts) return '!!!Error data!!!'
  const date = new Date(ts)
  const formattedDate = new Intl.DateTimeFormat(ZONE, OPTIONS).format(date)
  return formattedDate
}

export { createDateTimeFromTimestamp }
