export const validatePost = (title, content) => {
  const CONTENT_INVALID_VALUES = [
    '',
    '<p></p>',
    '<h1></h1>',
    '<h2></h2>',
    '<h3></h3>',
  ]
  return !(title && !CONTENT_INVALID_VALUES.includes(content))
}
