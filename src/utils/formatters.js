// https:// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

const ZONE = 'en' // 'ru'

/* const OPTIONS = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
} */

const OPTIONS = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}

// const OPTIONS = { dateStyle: 'long', timeStyle: 'long' }

// const OPTIONS = { dateStyle: 'short', timeStyle: 'long', hour12: false }

const getFormatDateTime = (ts) => {
  if (!ts) return '!!!Error data!!!'
  const date = new Date(ts)
  const formattedDate = new Intl.DateTimeFormat(OPTIONS).format(date)
  const formattedTime = date.toLocaleString(ZONE, OPTIONS)
  return [formattedDate, formattedTime].join(', ')
}

export { getFormatDateTime }
