export function generateID (prefix = '') {
  const id = prefix.toLowerCase() + new Date().valueOf() + Math.random()
  return id.toString().replace(/\./g, '')
}