export const SCOPE = '/p3r'

export function Link({ href, ...props }) {
  return <a href={scopedPath(href)} {...props} />
}

export function scopedPath(path) {
  return SCOPE + path
}
