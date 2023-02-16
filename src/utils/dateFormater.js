export const dateFormater = (date) => {
  return new Date(date).toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  })
}
