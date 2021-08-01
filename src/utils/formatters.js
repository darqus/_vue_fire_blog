const ZONE = 'en' // 'ru'

const OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}

// const OPTIONS = { dateStyle: 'long' }

const formatDate = (ts) => new Date(ts)
  .toLocaleString(ZONE, OPTIONS)

export { formatDate }
